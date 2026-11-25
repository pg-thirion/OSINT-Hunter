'use strict';
const { chromium, firefox, webkit } = require('playwright');
const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const {CASES}=require('./cases');
const base='http://127.0.0.1:8765/OSINT-Hunter/';
const engines={chromium,firefox,webkit};
const server=spawn(process.execPath,['static-test-server.cjs'],{stdio:'inherit'});
async function ready(){for(let i=0;i<100;i++){try{if((await fetch(base)).ok)return;}catch{}await new Promise(r=>setTimeout(r,100));}throw Error('Server did not start');}
async function suite(name){
 const browser=await engines[name].launch({headless:true});
 try{
 const context=await browser.newContext({viewport:{width:1440,height:900},acceptDownloads:true});
 const page=await context.newPage();const errors=[],requests=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});page.on('request',r=>{if(!r.url().startsWith(base)&&!r.url().startsWith('blob:'))requests.push(r.url())});page.on('dialog',d=>d.accept());
 const action=(a,id)=>page.locator('button[data-action="'+a+'"]'+(id?'[data-id="'+id+'"]':''));
 const exhibit=async id=>{await page.locator('.evidence[data-id="'+id+'"]').click();};
 await page.goto(base);await page.getByRole('heading',{name:'Follow the evidence. Find the truth.'}).waitFor();
 assert.equal(await page.locator('.case').count(),5);
 await action('help').click();assert.equal(await page.locator('#help').isVisible(),true);await action('help').click();assert.equal(await page.locator('#help').isVisible(),false);
 await action('open','01').click();await page.getByRole('heading',{name:'The Vanishing Shipment'}).waitFor();
 await page.locator('#search').fill('nonexistent');assert.equal(await page.locator('.evidence').count(),0);await page.locator('#search').clear();
 await page.locator('#filter').selectOption('Photo');assert.equal(await page.locator('.evidence').count(),1);await exhibit('E04');assert.equal(await page.locator('svg.photo').count(),1);
 await action('pin','E04').first().click();await page.locator('#filter').selectOption('Pinned');assert.equal(await page.locator('.evidence').count(),1);
 await action('view','board').click();await page.locator('#from').selectOption('E02');await page.locator('#to').selectOption('E04');await page.locator('#relation').fill('<img src=x onerror=alert(1)> seal matches');await action('link').click();assert.equal(await page.locator('#centre img').count(),0);assert.match(await page.locator('#centre').innerText(),/seal matches/);
 await page.locator('#notes').fill('Field notes: <script>not executable</script>');await page.reload();assert.equal(await page.locator('#notes').inputValue(),'Field notes: <script>not executable</script>');
 await action('view','board').click();assert.match(await page.locator('#centre').innerText(),/seal matches/);await action('unlink').click();assert.match(await page.locator('#centre').innerText(),/No connections yet/);
 await action('view','timeline').click();assert.match(await page.locator('#centre').innerText(),/Loading bay photograph/);
 const downloadPromise=page.waitForEvent('download');await action('export').click();const download=await downloadPromise;assert.equal(download.suggestedFilename(),'osint-case-01.txt');
 await action('view','report').click();await action('submit').click();assert.match(await page.locator('#notice').innerText(),/Answer every question/);
 await action('hint').first().click();assert.match(await page.locator('.hint').innerText(),/Match the original seal/);
 await action('reset-case').click();assert.equal(await page.locator('#notes').inputValue(),'');assert.equal(await page.locator('.pinitem').count(),0);
 for(const c of CASES){
  await page.goto(base+'#case/'+c.id);await page.getByRole('heading',{name:c.title,exact:true}).waitFor();
  await page.locator('#filter').selectOption('All');
  for(const e of c.evidence){await exhibit(e[0]);assert.match(await page.locator('#centre').innerText(),new RegExp(e[0]));}
  await action('view','report').click();
  for(const [i,q] of c.questions.entries()){
   await page.locator('input[type=radio][data-question="'+i+'"][value="'+q[2]+'"]').check();
   for(const ref of q[3])await page.locator('input[data-question="'+i+'"][data-ref="'+ref+'"]').check();
  }
  await action('submit').click();await page.getByRole('heading',{name:'Case debrief'}).waitFor();
  assert.match(await page.locator('.result').innerText(),/300 \/ 300/);
  assert.equal(await page.locator('input[data-question]:not(:disabled)').count(),0);
  await page.reload();await action('view','report').click();assert.match(await page.locator('.result').innerText(),/300 \/ 300/);
 }
 await page.goto(base+'#dashboard');assert.match(await page.locator('.metrics').innerText(),/5 \/ 5/);assert.match(await page.locator('.metrics').innerText(),/1500/);
 for(const width of [320,390,768,1024]){
  await page.setViewportSize({width,height:844});await page.goto(base+'#case/01');await page.getByRole('heading',{name:'The Vanishing Shipment'}).waitFor();
  for(const view of ['evidence','board','timeline','report']){await action('view',view).click();assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Overflow '+name+' '+width+' '+view);}
 }
 await page.goto(base+'#dashboard');await action('reset-all').click();assert.match(await page.locator('.metrics').innerText(),/0 \/ 5/);
 await page.evaluate(()=>localStorage.setItem('osint-hunter-v1',JSON.stringify({'01':{seen:[null,'INVALID','E01'],answers:[],links:[null],events:[{id:'E01',time:'bad'}],submitted:true},'02':[]})));await page.reload();assert.equal(await page.locator('.case').count(),5);await action('open','01').click();assert.equal(await page.locator('#notes').inputValue(),'');await action('view','report').click();assert.equal(await page.getByRole('heading',{name:'Investigation report'}).count(),1);
 await page.evaluate(()=>localStorage.setItem('osint-hunter-v1','invalid-json'));await page.reload();assert.equal(await page.locator('.evidence').count(),7);
 assert.deepEqual(errors,[]);assert.deepEqual(requests,[]);
 await context.close();console.log(name+': all gameplay, persistence, responsive and security smoke checks passed');
 }finally{await browser.close();}
}
(async()=>{try{await ready();for(const name of process.argv.slice(2).length?process.argv.slice(2):['chromium','firefox','webkit'])await suite(name);}finally{server.kill();}})().catch(e=>{console.error(e);process.exitCode=1;});

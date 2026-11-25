'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const {CASES,score,validate}=require('./cases.js');
test('all cases contain valid unique IDs and evidence references',()=>{assert.equal(validate(CASES),true);assert.equal(CASES.length,5);});
for(const c of CASES){
 const perfect=c.questions.map(q=>({choice:q[2],refs:q[3]}));
 test(c.title+' - exact corroboration',()=>assert.equal(score(c,perfect,[]).total,300));
 test(c.title+' - no corroboration',()=>assert.equal(score(c,perfect.map(a=>({...a,refs:[]})),[]).total,120));
 test(c.title+' - extra irrelevant evidence',()=>assert.equal(score(c,perfect.map(a=>({...a,refs:c.evidence.map(e=>e[0])})),[]).total,240));
 test(c.title+' - hint deduction',()=>assert.equal(score(c,perfect,[0,1,2]).total,255));
 test(c.title+' - no answers and score floor',()=>assert.equal(score(c,[],[0,1,2]).total,0));
 test(c.title+' - incorrect answer',()=>assert.equal(score(c,[{choice:(c.questions[0][2]+1)%c.questions[0][1].length,refs:c.questions[0][3]}],[]).total,0));
}
test('invalid evidence reference rejected',()=>assert.throws(()=>validate([{id:'x',evidence:[['E01']],questions:[['Question',['Option'],0,['E99']]]}])));

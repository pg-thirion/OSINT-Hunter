'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const {CASES,score,validate,filterCases,dailyCase,achievements,cleanAnalysis}=require('./cases.js');
test('all cases contain valid unique IDs and evidence references',()=>{assert.equal(validate(CASES),true);assert.equal(CASES.length,8);});
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

test('duplicate evidence does not reduce exact corroboration',()=>{const c=CASES[0];const perfect=c.questions.map(q=>({choice:q[2],refs:[...q[3],q[3][0]]}));assert.equal(score(c,perfect,[]).total,300);});
test('only valid unique hint indices count',()=>{const c=CASES[0];const perfect=c.questions.map(q=>({choice:q[2],refs:q[3]}));assert.equal(score(c,perfect,[0,0,9,-1,'1']).total,285);});
test('absent or invalid answer containers are tolerated',()=>{assert.equal(score(CASES[0],null,null).total,0);});
test('invalid question references rejected in otherwise valid case',()=>{const c=structuredClone(CASES[0]);c.questions[0][3]=['E99'];assert.throws(()=>validate([c]));});
test('duplicate evidence IDs rejected',()=>{const c=structuredClone(CASES[0]);c.evidence.push(c.evidence[0]);assert.throws(()=>validate([c]));});

test('case search, status, sorting and difficulty filters',()=>{const states={'01':{starred:true,seen:['E01'],lastVisit:10},'02':{submitted:true,seen:['E01'],lastVisit:20}};assert.equal(filterCases(CASES,states,{query:'ghost'})[0].id,'06');assert.equal(filterCases(CASES,states,{status:'Starred'}).length,1);assert.equal(filterCases(CASES,states,{status:'Closed'}).length,1);assert.equal(filterCases(CASES,states,{status:'In progress'}).length,1);assert.equal(filterCases(CASES,states,{sort:'Recent'})[0].id,'02');assert.ok(filterCases(CASES,states,{level:'Expert'}).every(c=>c.level==='Expert'));});
test('daily case stable across same UTC date',()=>{assert.equal(dailyCase(CASES,new Date('2026-11-26T00:00:00Z')).id,dailyCase(CASES,new Date('2026-11-26T23:59:00Z')).id);assert.notEqual(dailyCase(CASES,new Date('2026-11-26T00:00:00Z')).id,dailyCase(CASES,new Date('2026-11-27T00:00:00Z')).id);});
test('achievement criteria',()=>{const c=CASES[0];const states={[c.id]:{submitted:true,answers:c.questions.map(q=>({choice:q[2],refs:q[3]})),hints:[],seen:c.evidence.map(e=>e[0]),links:[1,2,3]}};assert.equal(achievements(CASES,states).filter(a=>a.earned).length,5);assert.equal(achievements(CASES,{}).filter(a=>a.earned).length,0);});
test('analysis storage sanitises flags, annotations and confidence',()=>{const s=cleanAnalysis({flags:['E01','E01','bad'],ratings:{E01:'Reliable',E02:'bad'},annotations:{E01:'x'.repeat(600),bad:'x'},confidence:{0:'High',9:'Low'},checklist:[0,0,4,-1],started:-1,finished:0},CASES[0]);assert.deepEqual(s.flags,['E01']);assert.deepEqual(s.ratings,{E01:'Reliable'});assert.equal(s.annotations.E01.length,500);assert.deepEqual(s.confidence,{0:'High'});assert.deepEqual(s.checklist,[0]);assert.equal(s.started,0);});

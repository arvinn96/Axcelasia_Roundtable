import test from 'node:test';
import assert from 'node:assert/strict';
import {passwordMatches,createSessionToken,isValidSessionToken} from '../lib/organiser-policy.ts';
import {filterRegistrations,registrationDate} from '../lib/rsvp-filters.ts';
import {createWorkbook} from '../lib/xlsx.ts';
test('organiser password and session tokens deny missing, wrong, tampered and expired values',()=>{
  assert.equal(passwordMatches('secret',undefined),false);
  assert.equal(passwordMatches('',''),false);
  assert.equal(passwordMatches('wrong','secret'),false);
  assert.equal(passwordMatches('secret','secret'),true);
  const now=Date.now(),token=createSessionToken('key',now);
  assert.equal(isValidSessionToken(token,'key',now),true);
  assert.equal(isValidSessionToken(token,'other-key',now),false);
  assert.equal(isValidSessionToken(token,undefined,now),false);
  assert.equal(isValidSessionToken(token.slice(0,-2)+'xx','key',now),false);
  assert.equal(isValidSessionToken(token,'key',now+13*3600_000),false);
  assert.equal(isValidSessionToken(undefined,'key',now),false);
});
test('search and spa filters intersect without dropping phone values',()=>{
 const rows=[{name:'Alice',company:'Alpha',email:'alice@alpha.com',phone:'+60123456789',spa:'yes'},{name:'Bob',company:'Beta',phone:'+60987654321',spa:'no'}];
 assert.equal(filterRegistrations(rows,'alpha','all').length,1);
 assert.equal(filterRegistrations(rows,'alice@','all')[0].name,'Alice');
 assert.equal(filterRegistrations(rows,'ALPHA','no').length,0);
 assert.equal(filterRegistrations(rows,'9876','no')[0].name,'Bob');
 assert.match(registrationDate('2026-10-25T18:00:00Z'),/26 Oct 2026/);
});
test('Excel archive stores phone and formula-like values as literal text',()=>{
 const data=createWorkbook([['=HYPERLINK("bad")','A&B <Co>','guest@example.com','+60123456789','Yes','26 Oct 2026','26 Oct 2026']]);
 const view=new DataView(data.buffer),decoder=new TextDecoder(),files={};let offset=0;
 while(view.getUint32(offset,true)===0x04034b50){const size=view.getUint32(offset+18,true),nameLength=view.getUint16(offset+26,true),extraLength=view.getUint16(offset+28,true),start=offset+30+nameLength+extraLength;files[decoder.decode(data.slice(offset+30,offset+30+nameLength))]=decoder.decode(data.slice(start,start+size));offset=start+size;}
 assert.equal(Object.keys(files).length,6);
 const sheet=files['xl/worksheets/sheet1.xml'];
 assert.match(sheet,/t="inlineStr"/);assert.match(sheet,/\+60123456789/);assert.match(sheet,/A&amp;B &lt;Co&gt;/);assert.match(sheet,/=HYPERLINK/);assert.ok(!sheet.includes('<f>'));
 assert.equal(view.getUint32(data.length-22,true),0x06054b50);
});

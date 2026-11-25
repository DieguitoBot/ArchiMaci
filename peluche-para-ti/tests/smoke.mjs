import test from 'node:test';
import assert from 'node:assert/strict';
import {readPreferences,savePreferences,defaults} from '../js/storage.js';
import {bear,gift,garden} from '../js/illustrations.js';
import {formatDate} from '../js/certificate.js';
import {writeFileSync,mkdirSync} from 'node:fs';
let stored=null;
globalThis.localStorage={getItem:()=>stored,setItem:(_,value)=>{stored=value;}};
test('new visitors receive a silent gift dedicated to Maci',()=>{stored=null;const state=readPreferences();assert.equal(state.ownerName,'Maci');assert.equal(state.sound,false);assert.equal(state.adopted,false);assert.deepEqual(state.hearts,[]);});
test('personalization, adoption and unlocked moments survive a return visit',()=>{const expected={...defaults,bearName:'Nube',ownerName:'Maci',bow:'#A3D9C9',accessory:'flower',expression:'shy',hugs:17,hearts:[0,4,2,1,3],adopted:true,adoptionDate:'2026-11-25',letterOpened:true,sound:true};assert.equal(savePreferences(expected),true);assert.deepEqual(readPreferences(),expected);});
test('corrupt storage recovers without breaking the gift',()=>{for(const item of ['{invalid','null','42','[]']){stored=item;const result=readPreferences();assert.equal(result.ownerName,'Maci');assert.equal(result.hugs,0);}});
test('untrusted stored properties cannot inject SVG colors or invalid progress',()=>{stored=JSON.stringify({bow:'red;display:none',accessory:'<script>',expression:'unknown',hugs:-5,hearts:[-1,0,0,3,9,'2',2.5],bearName:'x'.repeat(60),ownerName:'y'.repeat(60),adoptionDate:'not a date'});const result=readPreferences();assert.equal(result.bow,defaults.bow);assert.equal(result.accessory,'none');assert.equal(result.expression,'normal');assert.equal(result.hugs,0);assert.deepEqual(result.hearts,[0,3]);assert.equal(result.bearName.length,24);assert.equal(result.ownerName.length,32);assert.equal(result.adoptionDate,'');});
test('blocked storage degrades without throwing',()=>{const old=globalThis.localStorage;globalThis.localStorage={getItem(){throw Error('blocked');},setItem(){throw Error('quota');}};assert.equal(readPreferences().ownerName,'Maci');assert.equal(savePreferences(defaults),false);globalThis.localStorage=old;});
test('each bear uses unique SVG paint references',()=>{const first=bear(),second=bear();const a=first.match(/id="(fur-\d+)"/)[1],b=second.match(/id="(fur-\d+)"/)[1];assert.notEqual(a,b);assert.ok(first.includes(`url(#${a})`));});
test('adoption dates format in Spanish without UTC day shifts',()=>{assert.equal(formatDate('2026-11-25'),'25 de noviembre de 2026');});
// Export every illustration variant for independent XML validation.
mkdirSync('/tmp/maci-svg-check',{recursive:true});
for(const expression of ['normal','happy','shy','sleep','surprise','hug'])for(const accessory of ['none','flower','star'])writeFileSync(`/tmp/maci-svg-check/${expression}-${accessory}.svg`,bear({expression,accessory}));
writeFileSync('/tmp/maci-svg-check/gift.svg',gift());writeFileSync('/tmp/maci-svg-check/garden.svg',garden());

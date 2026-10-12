import test from 'node:test';
import assert from 'node:assert/strict';
import {sampleProperties,filterProperties,priceLabel} from '../src/lib/data.ts';

test('the concept has twelve purchase samples, six rentals and unique routes',()=>{
  assert.equal(filterProperties(sampleProperties,'buy',{}).length,12);
  assert.equal(filterProperties(sampleProperties,'rent',{}).length,6);
  assert.equal(new Set(sampleProperties.map(p=>p.slug)).size,18);
});
test('combined location, budget and room criteria narrow the catalogue',()=>{
  assert.deepEqual(filterProperties(sampleProperties,'buy',{location:'Borrowdale',max:'800000',beds:'4',baths:'4'}).map(p=>p.title),['The Palm Villa']);
  assert.equal(filterProperties(sampleProperties,'buy',{location:'Borrowdale',max:'100'}).length,0);
});
test('rental results retain monthly pricing and do not mix purchase data',()=>{
  const results=filterProperties(sampleProperties,'rent',{max:'1500',sort:'price-low'});
  assert.deepEqual(results.map(p=>p.price),[950,1100,1300]);
  assert.match(priceLabel(results[0]),/month/);
});
test('keyword and lifestyle searches use the actual listing records',()=>{
  assert.deepEqual(filterProperties(sampleProperties,'buy',{q:'treehouse'}).map(p=>p.title),['The Treehouse']);
  assert.ok(filterProperties(sampleProperties,'buy',{lifestyle:'investment'}).every(p=>p.lifestyle.includes('investment')));
});
test('hidden listings are removed and price sorting is deterministic',()=>{
  const items=sampleProperties.map(p=>({...p,available:p.id!=='JP-001'}));
  const result=filterProperties(items,'buy',{sort:'price-high'});
  assert.equal(result.length,11);
  assert.equal(result[0].price,735000);
  assert.ok(result.every((p,i)=>i===0||result[i-1].price>=p.price));
});

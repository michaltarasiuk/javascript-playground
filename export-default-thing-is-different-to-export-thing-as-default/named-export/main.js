import {thing as importedThing} from './module.js';

const module = await import('./module.js');
const {thing} = await import('./module.js');

setTimeout(() => {
  console.log(importedThing); // "changed"
  console.log(module.thing); // "changed"
  console.log(thing); // "initial"
}, 1_000);

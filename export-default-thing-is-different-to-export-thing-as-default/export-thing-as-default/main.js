import {thing, default as defaultThing} from './module.js';
import anotherDefaultThing from './module.js';

setTimeout(() => {
  console.log(thing); // "changed"
  console.log(defaultThing); // "changed"
  console.log(anotherDefaultThing); // "changed"
}, 1000);

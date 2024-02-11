import foo from './module.js';

foo();

function hello() {
  console.log('hello');
}

export {hello as default};

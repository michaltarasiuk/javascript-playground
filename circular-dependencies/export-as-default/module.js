import hello from './main.js';

hello();

function foo() {
  console.log('foo');
}

export {foo as default};

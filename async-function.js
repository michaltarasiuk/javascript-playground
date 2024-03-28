const AsyncFunction = (async () => {}).constructor;

const add = new AsyncFunction('a', 'b', 'return a + b;');

// #1
// Promise {3}
add(1, 2);

// #2
// async function anonymous(a, b) {
//   return a + b;
// }
add.toString();

// Note:
// Even though the return value of an async function behaves as if it's wrapped in a Promise.resolve, they are not equivalent.
// An async function will return a different reference, whereas Promise.resolve returns the same reference if the given value is a promise.
// It can be a problem when you want to check the equality of a promise and a return value of an async function.

const p = new Promise((res, rej) => {
  res(1);
});

async function asyncReturn() {
  return p;
}

function basicReturn() {
  return Promise.resolve(p);
}

p === basicReturn(); // true
p === asyncReturn(); // false

// Top-level code, up to and including the first await expression (if there is one),
// is run synchronously. In this way, an async function without an await expression will run synchronously.
// If there is an await expression inside the function body, however, the async function will always complete asynchronously.

// 'foo', 'bar', 'baz'
(async function () {
  ('foo');
  ('bar');
})();
('baz');

// 'foo', 'baz', 'bar'
(async function () {
  ('foo');
  await Promise.resolve();
  ('bar');
})();
('baz');

// Note:
// Code after each await expression can be thought of as existing in a .then callback.
// In this way a promise chain is progressively constructed with each reentrant step through the function.
// The return value forms the final link in the chain.

// 'foo', Promise {'bar'}, 'baz', 'bar'
function bar() {
  return Promise.resolve('bar');
}

('foo');
bar().then((bar) => bar);
('baz');

// #1
// The first line of the body of function foo is executed synchronously, with the await expression configured with the pending promise.
// Progress through foo is then suspended and control is yielded back to the function that called foo.
// #2
// Some time later, when the first promise has either been fulfilled or rejected, control moves back into foo.
// The result of the first promise fulfillment (if it was not rejected) is returned from the await expression. Here 1 is assigned to result1.
// Progress continues, and the second await expression is evaluated. Again, progress through foo is suspended and control is yielded.
// #3
// Some time later, when the second promise has either been fulfilled or rejected,
// control re-enters foo. The result of the second promise resolution is returned from the second await expression. Here 2 is assigned to result2. Control moves to the return expression (if any). T
// The default return value of undefined is returned as the resolution value of the current promise.

async function baz() {
  const result1 = await new Promise((resolve) =>
    setTimeout(() => resolve('1')),
  );
  const result2 = await new Promise((resolve) =>
    setTimeout(() => resolve('2')),
  );

  result1, result2;
}

// 'foo', baz(), 'bar', '1', '2'
('foo');
baz();
('bar');

// In the following code an unhandled promise rejection error will be thrown,
// even if a .catch handler has been configured further along the promise chain.
// This is because p2 will not be "wired into" the promise chain until control returns from p1.

async function unhandledPromiseReject() {
  const p1 = new Promise((resolve) => setTimeout(() => resolve('1'), 1000));
  const p2 = new Promise((_, reject) => setTimeout(() => reject('2'), 500));
  [await p1, await p2]; // Do not do this! Use Promise.all or Promise.allSettled instead.
}

unhandledPromiseReject().catch(() => {});

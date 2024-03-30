import 'core-js/proposals/iterator-helpers.js';

function* naturals() {
  let num = 0;

  while (true) {
    yield num;
    num++;
  }
}

const result = naturals().map((value) => value * value);

// {
//   value: 0,
//   done: false,
// }
result.next();
// {
//   value: 1,
//   done: false,
// }
result.next();

// [ 4, 9, 16, 25, 36 ]
result.take(5).toArray();

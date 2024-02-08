function sleep({value, time}) {
  return new Promise((resolve) => setTimeout(resolve, time, value));
}

function unhandledPromise(time) {
  return new Promise((_resolve, reject) => setTimeout(reject, time));
}

const promises = [
  sleep({value: 1, time: 3_000}),
  sleep({value: 2, time: 2_000}),
  unhandledPromise(1_000),
];

for await (const promise of promises) {
  console.log(promise);
}

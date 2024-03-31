function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function* timeGenerator() {
  while (true) {
    yield new Date().toLocaleTimeString();
  }
}

const stream = new ReadableStream({
  start(controller) {
    const timeIterator = timeGenerator();

    (async function next() {
      const {value, done} = timeIterator.next();
      if (done) {
        controller.close();
      } else {
        await wait(2000);
        controller.enqueue(value);
        await next();
      }
    })();
  },
});

const reader = stream.getReader();
while (true) {
  const {done, value} = await reader.read();
  if (done) {
    break;
  }
  console.log(value);
}

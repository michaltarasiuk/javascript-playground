import fs from 'fs/promises';

const AsyncGeneratorFunction = async function* () {}.constructor;

const numbers = new AsyncGeneratorFunction('yield 1; yield 2;');

// #1
// { value: 1, done: false }
await numbers().next();

// #2
// async function* anonymous() {
//   yield 1;
//   yield 2;
// }
numbers.toString();

// 1 will be logged, because if the yielded promise rejects, the iterator result will reject as well. The value property of an async generator's resolved result will not be another promise.
async function* foo() {
  yield Promise.reject(1);
}

foo()
  .next()
  .catch((e) => e);

// Using an async generator function to read a series of files
async function* readFiles(directory) {
  const files = await fs.readdir(directory);
  for (const file of files) {
    const stats = await fs.stat(file);
    if (stats.isFile()) {
      yield {
        name: file,
        content: await fs.readFile(file, 'utf8'),
      };
    }
  }
}

const files = readFiles('.');

await files.next();
await files.next();

// {
//   value: {
//     name: '.gitignore',
//     content: '# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.\n' +
//       '\n' +
//       '# dependencies\n' +
//       'node_modules\n' +
//       '\n' +
//       '# ignore environment configuration files\n' +
//       '.env\n'
//   },
//   done: false
// }
await files.next();

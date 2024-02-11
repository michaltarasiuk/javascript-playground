const wait = (ms) => new Promise((r) => setTimeout(() => r(), ms));

const resolved = await Promise.resolve('one').finally(async () => {
  await wait(2000);
  return 'two';
});

console.log(resolved);

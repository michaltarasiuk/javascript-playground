async function isPositive(text) {
  const response = await fetch(`http://text-processing.com/api/sentiment/`, {
    method: 'POST',
    body: new URLSearchParams({text}),
  });
  const json = await response.json();
  return json.label === 'pos';
}

console.log(await isPositive('Hello, World!'));

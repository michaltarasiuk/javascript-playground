export default function thing() {}

setTimeout(() => {
  thing = 'changed';
}, 500);

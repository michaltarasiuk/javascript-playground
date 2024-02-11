let thing = 'initial';

export {thing};
export default thing;

setTimeout(() => {
  thing = 'changed';
}, 500);

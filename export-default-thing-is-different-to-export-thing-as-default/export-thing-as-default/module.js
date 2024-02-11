let thing = 'initial';

export {thing, thing as default};

setTimeout(() => {
  thing = 'changed';
}, 500);

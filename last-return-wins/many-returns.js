function manyReturns() {
  try {
    return 'one';
  } finally {
    try {
      return 'two';
    } finally {
      return 'three';
    }
  }
}

console.log(manyReturns());

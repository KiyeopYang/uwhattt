async function test(a) {
  if (a>0) {
    return 5;
  } else {
    throw new Error('hi');
  }
}

test(-1)
  .then(console.log)
  .catch(console.error);
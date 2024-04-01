const start = {
  value: 0,
};

// The initialization block accepts both expressions and variable declarations.
// However, expressions cannot use the in operator unparenthesized, because that is ambiguous with a for...in loop
for (let i = ('value' in start); i < 9; i++) {}

for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    // It logs 0, 1, and 2.
    i;
  }, 1000);
}

// The reason is that each setTimeout creates a new closure that closes over the i variable,
// but if the i is not scoped to the loop body, all closures will reference the same variable when they eventually get called — and due to the asynchronous nature of setTimeout,
// it will happen after the loop has already exited, causing the value of i in all queued callbacks' bodies to have the value of 3.
{
  let i = 0;
  for (; i < 3; i++) {
    setTimeout(() => {
      // It logs 3, 3, and 3.
      i;
    }, 1000);
  }
}

// This also happens if you use a var statement as the initialization,
// because variables declared with var are only function-scoped,
// but not lexically scoped (i.e. they can't be scoped to the loop body).

for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    // It logs 3, 3, and 3.
    i;
  }, 1000);
}

// A new lexical scope is also created after initialization, just before condition is evaluated for the first time.
// These details can be observed by creating closures,
// which allow to get hold of a binding at any particular point.
// For example, in this code a closure created within the initialization section does not get updated by re-assignments of i in the afterthought:

// It logs 0, 0, and 0.
for (let i = 0, getI = () => i; i < 3; i++) {
  getI();
}

// It logs 1 and 2.
for (let i = 0, getI = () => i; i++, getI(), (getI = () => i), true; ) {
  if (i === 3) break;
}

// This does not log "0, 1, 2", like what would happen if getI is declared in the loop body.
// This is because getI is not re-evaluated on each iteration — rather,
// the function is created once and closes over the i variable,
// which refers to the variable declared when the loop was first initialized.
// Subsequent updates to the value of i actually create new variables called i,
// which getI does not see. A way to fix this is to re-compute getI every time i updates:

// It logs 0, 1, and 2.
for (let i = 0, getI = () => i; i < 3; i++, getI = () => i) {
  getI();
}

// In fact, you can capture this initial binding of the i variable and re-assign it later,
// and this updated value will not be visible to the loop body, which sees the next new binding of i.

for (
  let i = 0, getI = () => i, incrementI = () => i++;
  getI() < 3;
  incrementI()
) {
  // It logs 0, 0, and 0.
  i;
}

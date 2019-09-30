const mult = (x, y) =>{
  return x * y;
};

const square = (num) => {
  return mult(num, num);
};

const showSquare = (n) => {
  const res= square(n);
  console.log(res);
};

showSquare(2);

const killChrome =() => {
  debugger;
  killChrome();
};

killChrome();
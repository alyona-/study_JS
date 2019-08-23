let num = 266219,
    arr = num.toString().split(''),
    mult = arr[0];

for (let i = 1; i < arr.length; i++) {
    mult *= Number(arr[i]);
}

console.log(mult);

mult = mult ** 3;

console.log(mult.toString().substring(0, 2));
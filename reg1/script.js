const reg = /привет/;
const reg2 = new RegExp('привет');

console.log(reg);
console.log(reg2);

let str = "Всем привет, добро пожаловать";
let str2 = "Всем Привет, добро пожаловать";
let str3 = "привет, добро пожаловать";
console.log(reg.test(str));
console.log(reg.test(str2));
console.log(/^привет/.test(str3));
console.log(/^привет$/.test(str3));


const string = `Привет друг, добропожаловать, прошу проходите`;
//флаг i - позволяет искать строку игнорируя регистр ,  g -массив из всех подстрок в виде массива
const result = string.match(/п/ig);

console.log(result);
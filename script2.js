/*
Создайте функцию, которая принимает 1 аргумент (название произвольное)
Если как аргумент передана не строка - функция оповещает об этом пользователя
В полученной (как аргумент) строке функция должна убрать все пробелы в начале и в конце
Если строка более 30 знаков - то после 30го символа часть текста скрывается и вместо них появляются три точки (...)
*/

function isString(arg1) {
    arg1 = arg1.trim();
    if(!arg1){
        return "В функцию передана не строка";
    }else {
        if(arg1.length >30) {
            return arg1.substring(0,30).concat("...");
        }else {
            return arg1;
        }
    }
}

console.log(isString(prompt("Введите строку ...")));
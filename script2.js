/*
1) Создать массив arr = []
— Записать в него 7 любых многозначных чисел в виде строк
— Вывести в консоль только те, что начинаются с цифры 2 или 4 (Должны присутствовать в массиве)
*/
let cryptoStor = new Uint16Array(1),
    arr = [];

for (let i = 0; i < 7; i++) {
    let num;
    do {
        num = prompt("Введите " + (i + 1) + " -ое число ", (window.crypto.getRandomValues(cryptoStor)).toString());
    } while (isNaN(num) || num == '' || num == null);

    arr.push(num);

    if (arr[i].substr(0, 1) === "2" || arr[i].substr(0, 1) === "4") {
        console.log("i = " + (i + 1) + " - " + arr[i]);
    }
}

/*
2) Вывести в столбик все простые числа от 1 до 100
— Статья про простые числа - КЛИК
— Рядом с каждым числом написать оба делителя данного числа
    Например: “Делители этого числа: 1 и n”
*/
for (let i = 1; i <= 100; i++) {
    if (i === 1) console.log(i + " Делители этого числа: " + i);
    else {
        for (let j = 2; j <= i; j++) {
            if ((i !== j) && (i % j === 0)) break;
            if (j === i) {
                console.log(i + " Делители этого числа: 1 и " + i);
            }
        }
    }
}
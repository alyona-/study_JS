function getResult(a, b) {
    let result = 1,
        arr;
    // умножаем result на x n раз в цикле
    for (let i = 0; i < b; i++) {
        result *= a;
    }
    arr = result.toString().split('');
    result = a + ' в степени ' + b + ' = ' + result + ', а сумма его цифр составляет ' + arr.join("+") + "=" + arr.reduce(function (sum, elem) {
        return sum + elem;
    });
    return result;
}

console.log(getResult(3, 10));

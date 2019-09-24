const input =document.querySelector('input'),
    output = document.querySelector('.output');


  /*  input.addEventListener('input', () => {
       let text = input.value;
       //output.textContent = text.replace(/алена/gi, (match) => match.toUpperCase());
        //val1 - входная группа
       output.textContent = text.replace(/алена/gi, (match, val1) => match.toUpperCase());
    }); */
/*
//Получить из почты имя пользователя val1 - то что заключено 1 раз в скобки
input.addEventListener('input', () => {
    let text = input.value;
    output.textContent = text.replace(/(\w+)@\w+\.\w{2,3}/gi, (match, val1) => val1);
}); */

/*//Получить из почты имя пользователя val2 - то что заключено 2 раз в скобки
input.addEventListener('input', () => {
    let text = input.value;
    output.textContent = text.replace(/(\w+)@(\w+\.\w{2,3})/gi, (match, val1, val2) => val2);
}); */

/*//Валидация форм вводить только цифры
input.addEventListener('input', () => {
    input.value = input.value.replace(/\D/gi, '');
});  */
//Заменить все буквы на звездочки
input.addEventListener('input', () => {
    input.value = input.value.replace(/\D/gi, '*');
});
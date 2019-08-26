let lang = confirm("Ru ?"),
    ruDays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    enDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

if (lang) lang = "ru";
else lang = "en";

// a. через if,
if (lang === 'ru') {
    console.log(ruDays);
} else if (lang === 'en') {
    console.log(enDays);
}

//b. через switch-case
switch (lang) {
    case "ru":
        console.log(ruDays);
        break;
    case "en":
        console.log(enDays);
        break;
}

//c. через многомерный массив без ифов и switch.
let allDays = {
    "ru": ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    "en": ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
};
console.log(allDays[lang]);

//У нас есть переменная namePerson. Если значение этой переменной “Артем” то вывести в консоль “директор”,
// если значение “Максим” то вывести в консоль “преподаватель”
// , с любым другим значением вывести в консоль “студент”
let namePerson = prompt("Как вас зовут?").trim();
namePerson = namePerson[0].toUpperCase() + namePerson.substr(1).toLowerCase();
(namePerson === "Артем") ? console.log("директор")
    : (namePerson === "Максим") ? console.log("преподаватель")
    : console.log("студент");
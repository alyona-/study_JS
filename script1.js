let money = 2000000,
    income = "500000",
    addExpenses,
    deposit,
    mission = 200000,
    period = 1;

//1) месячный доход
money = +prompt("Ваш месячный доход?");

//2) Возможные расходы
addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую", "интернет, еда, вода")
    .replace(" ", "").split(",");
console.log("addExpenses: ", addExpenses);

//3) Депозит
deposit = confirm("Есть ли у вас депозит в банке?");

//4) Вывести в консоль типы данных money, income, deposit
console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

//5)
let question1 = prompt("Какие обязательные ежемесячные расходы у вас есть?"),
    question2 = +prompt("Во сколько это обойдется?"),
    question3 = prompt("Какие обязательные ежемесячные расходы у вас есть?"),
    question4 = +prompt("Во сколько это обойдется?");

//6) доход за месяц, учитывая обязательные расходы
isNaN(question2) ? question2 = 0 : question2;
isNaN(question4) ? question4 = 0 : question4;
let budgetMonth = money - (question2 + question4);
console.log('Доход за месяц: ', budgetMonth);

//7) за сколько месяцев будет достигнута цель mission,  округляя в большую сторону
let countMonth = Math.ceil(mission / budgetMonth, 0);
console.log('Цель будет достигнута за: ', countMonth, ' месяцев');

//8) budgetDay учитывая бюджет на месяц
let budgetDay = Math.floor(budgetMonth / 30, 0);
console.log('Ежедневный доход: ', budgetDay);

//9)
if (budgetDay >= 800) {
    console.log("Высокий уровень дохода");
} else if (budgetDay >= 300 && budgetDay < 800) {
    console.log("Средний уровень дохода");
} else if (budgetDay >= 0 && budgetDay < 300) {
    console.log("Низкий уровень дохода");
} else if (budgetDay < 0) {
    console.log("Что то пошло не так");
}
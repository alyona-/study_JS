let money,
    income = "500000",
    addExpenses,
    deposit,
    mission = 200000,
    period = 1;

// месячный доход
money = +prompt("Ваш месячный доход?");

// Возможные расходы за расчитываемый период записанные через запятую
addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую", "интернет, еда, вода")
    .replace(" ", "").split(",");
console.log("addExpenses: ", addExpenses);

// 1. a. Функция возвращает сумму всех расходов за месяц
function getExpensesMonth(expenses1, expenses2) {
    isNaN(expenses1) ? expenses1 = 0 : expenses1;
    isNaN(expenses2) ? expenses2 = 0 : expenses2;
    return expenses1 + expenses2;
}

// Депозит
deposit = confirm("Есть ли у вас депозит в банке?");
let showTypeof = function (item) {
    console.log('Type: ' + item, typeof item);
};

//Вывести в консоль типы данных money, income, deposit
showTypeof(money);
showTypeof(income);
showTypeof(deposit);

let question1 = prompt("Какие обязательные ежемесячные расходы у вас есть?"),
    question2 = +prompt("Во сколько это обойдется?"),
    question3 = prompt("Какие обязательные ежемесячные расходы у вас есть?"),
    question4 = +prompt("Во сколько это обойдется?");

//1. b. Функция getAccumulateMonth Функция возвращает накопления за месяц(доходы минус расходы)
function getAccumulatedMonth(income, expenses) {
    return income - expenses;
}

let accumulatedMonth = getAccumulatedMonth(money, getExpensesMonth(question2, question4));

//1. c. Функция getTargetMonth подсчитывает за какой период будет достигнута цель, зная результат месячного накопления
function getTargetMonth(mission, accumulatedMonth) {
    return Math.floor(mission / accumulatedMonth, 0);
}

console.log("Накопления за период: ", accumulatedMonth);

let countMonth = getTargetMonth(mission, accumulatedMonth);
console.log("Срок достижения цели в месяцах: ", countMonth);

let budgetDay = Math.floor(accumulatedMonth / 30, 0);

function getStatusIncome() {
    if (budgetDay >= 800) {
        return "Высокий уровень дохода";
    } else if (budgetDay >= 300 && budgetDay < 800) {
       return"Средний уровень дохода";
    } else if (budgetDay >= 0 && budgetDay < 300) {
      return "Низкий уровень дохода";
    } else if (budgetDay < 0) {
      return  "Что то пошло не так";
    }
}

console.log('getStatusIncome(): ', getStatusIncome());
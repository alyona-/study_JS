let money,
    income = "500000",
    addExpenses,
    deposit,
    mission = 200000,
    period = 1,

//1) Переписать функцию start циклом do while
    start = function () {
        do {
            money = +prompt("Ваш месячный доход?");

        } while (isNaN(money) || money == '' || money == null);
    };

start();

let appData = {};
appData.budget = money;
appData.budgetDay = 0;
appData.budgetMonth = 0;
appData.expensesMonth = 0;


// Возможные расходы за расчитываемый период записанные через запятую
addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую", "интернет, еда, вода")
    .replace(" ", "").split(",");
console.log("addExpenses: ", addExpenses);

let expenses1;

//2) Добавить валидацию (проверку) на данные которые мы получаем на вопрос 'Во сколько это обойдется?’ в функции  getExpensesMonth
appData.getExpensesMonth =  function (){
    appData.expenses = {};
    for(let i =0; i < 2; i++ ){
        if(i === 0) {
            expenses = prompt("Введите обязательную статью расходов?", "food");
        }else if(i === 1) {
            expenses = prompt("Введите обязательную статью расходов?", "water");
        }
        let tmp;
        do {
            tmp = +prompt("Во сколько это обойдется ");
        }while(isNaN(tmp) || tmp =='' ||tmp==null);
        appData.expenses[expenses]=tmp;
    }

    for(key in appData.expenses) {
        appData.expensesMonth+=appData.expenses[key];
    }
    return appData.expensesMonth;
};







// Депозит
deposit = confirm("Есть ли у вас депозит в банке?");
/*
let showTypeof = function (item) {
    console.log('Type: ' + item, typeof item);
};

//Вывести в консоль типы данных money, income, deposit
showTypeof(money);
showTypeof(income);
showTypeof(deposit); */

let expensesAmount = expensesMonth(),

    accumulateMonth = function () {
        return money - (expensesAmount);
    },

    appData.budgetPeriod = function () {
        return money * period;
    };

    appData.expensesPeriod = function () {
        return expensesAmount * period;
    };

    appData.incomePeriod = function () {
        return appData.budgetPeriod() - appData.expensesPeriod();
    };

    appData.budgetDay = function () {
        return Math.floor(accumulateMonth() / 30);
    };

    appData.getBudget =function () {
    appData.budgetMonth =appData.budget -appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth/ 30);
    return appData.budget -appData.expensesMonth;
    };

//1. c. Функция getTargetMonth подсчитывает за какой период будет достигнута цель, зная результат месячного накопления
    appData.getTargetMonth = function () {
        return Math.ceil(mission / accumulateMonth());
    };

//4) Если budgetDay отрицательное значение то вместо уровня дохода пусть выводится сообщение “Что то пошло не так”
    getStatusIncome = function () {
        if (budgetDay() >= 800) {
            return "Высокий уровень дохода";
        } else if (budgetDay() >= 300 && budgetDay() < 800) {
            return "Средний уровень дохода";
        } else if (budgetDay() >= 0 && budgetDay() < 300) {
            return "Низкий уровень дохода";
        } else if (budgetDay() < 0) {
            return "Что-то пошло не так.";
        }
    };
getStatusIncome();

console.log("Накопления за период: ", incomePeriod());

//3) Если getTargetMonth возвращает нам отрицательное значение то вместо “Цель будет достигнута”, необходимо выводить “Цель не будет достигнута”
if (getTargetMonth() < 0) {
    console.log("Цель не будет достигнута");
} else {
    console.log("Цель будет достигнута за " + getTargetMonth() + " месяца");
}

getStatusIncome();
let money,
    expenses = null,
    start = function () {
        do {
            money = prompt("Ваш месячный доход?");

        } while (isNaN(money) || money == '' || money == null);
    };
start();

let appData = {};
appData.budgetMonth = 0;
appData.expensesMonth = 0;
appData.period = 1;
appData.deposit = false;
appData.mission = 200000;
appData.income = "500000";
appData.budget = money;
appData.budgetDay = 0;


appData.getExpensesMonth = function () {
    appData.expensesMonth = appData.asking();
    return appData.expensesMonth;
};

appData.asking = function () {
    let sum = 0;
    appData.expenses = {};
    for (let i = 0; i < 2; i++) {
        if (i === 0) {
            expenses = prompt("Введите обязательную статью расходов?", "food");
        } else if (i === 1) {
            expenses = prompt("Введите обязательную статью расходов?", "water");
        }
        let tmp;
        do {
            tmp = +prompt("Во сколько это обойдется ");
        } while (isNaN(tmp) || tmp == '' || tmp == null);
        appData.expenses[expenses] = tmp;
    }

    for (let key in appData.expenses) {
        sum += appData.expenses[key];
    }
    return sum;
};

appData.getBudget = function () {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    return appData.budget - appData.expensesMonth;
};

appData.getTargetMonth = function () {
    return Math.ceil(mission / appData.getBudget());
};

appData.getStatusIncome = function () {
    if (appData.budgetDay >= 800) {
        return "Высокий уровень дохода";
    } else if (appData.budgetDay >= 300 && appData.budgetDay < 800) {
        return "Средний уровень дохода";
    } else if (appData.budgetDay >= 0 && appData.budgetDay < 300) {
        return "Низкий уровень дохода";
    } else if (appData.budgetDay < 0) {
        return "Что-то пошло не так.";
    }
};
appData.expensesAmount = appData.getExpensesMonth();
appData.accumulateMonth = function () {
    return appData.budget - appData.expensesMonth;
};
appData.budgetPeriod = function () {
    return appData.budget * appData.period;
};
appData.expensesPeriod = function () {
    return appData.expensesAmount * appData.period;
};
appData.incomePeriod = function () {
    return appData.budgetPeriod() - appData.expensesPeriod();
};


appData.getStatusIncome();


console.log("Расходы за месяц: ", appData.expensesMonth);
if (appData.getTargetMonth() < 0) {
    console.log("Цель не будет достигнута");
} else {
    console.log("Цель будет достигнута за " + appData.getTargetMonth() + " месяца");
}
console.log("Уровень дохода : ", appData.getStatusIncome());
console.log("Наша программа включает в себя данные: ");
let i = 1;
for (let key in appData) {
    console.log(i + ". appData." + key + " = " + appData[key]);
    i++;
}
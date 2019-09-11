let money,
    mission = 200000,
    period = 1,

    start = function () {
        do {
            money = prompt("Ваш месячный доход?");

        } while (isNaN(money) || money == '' || money == null);
    };
start();

let appData = {};
appData.budget = money;
appData.budgetDay = 0;
appData.budgetMonth = 0;
appData.expensesMonth = 0;
appData.incomeMonth = 0;
appData.income = {};
appData.depositYear = 0;
appData.deposit = {};

let expenses;
appData.getExpensesMonth = function () {
    appData.expensesMonth = appData.asking();
    return appData.expensesMonth;
};

let question, tmpName, tmpValue;
appData.getIncome = function () {
    question = validBoolean("Есть ли у вас дополнительный заработок?");
    tmpName = validString("Откуда у вас дополнительный заработок?", "freelance");
    tmpValue = validNumber("Сколько денег?", 100000);
    appData.income[tmpName] = parseInt(tmpValue);
    appData.incomeMonth = appData.income[tmpName];
};

appData.getIncome();

appData.getDeposit = function () {
    question = validBoolean("Есть ли у вас депозит в банке?");
    tmpName = validString("Какой тариф депозита", " VIP");
    tmpValue = validNumber("Сумма на счету", 10000);
    appData.deposit[tmpName] = parseInt(tmpValue);
    appData.depositYear = Math.floor((appData.deposit[tmpName] * 0.5 * 365) / (365 * 100));
};

appData.getDeposit();

appData.asking = function () {
    let sum = 0;
    appData.expenses = {};
    for (let i = 0; i < 2; i++) {
        if (i === 0) {
            expenses = validString("Введите обязательную статью расходов?", "food");
        } else if (i === 1) {
            expenses = validString("Введите обязательную статью расходов?", "water");
        }
        let tmp;
        tmp = validNumber("Во сколько это обойдется", 5000);
        appData.expenses[expenses] = tmp;
    }

    for (key in appData.expenses) {
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

let expensesAmount = appData.getExpensesMonth();
appData.accumulateMonth = function () {
    return appData.budget - appData.expensesMonth;
};

let budgetPeriod = function () {
    return appData.budget * period;
};
let expensesPeriod = function () {
    return expensesAmount * period;
};

let incomePeriod = function () {
    return budgetPeriod() - expensesPeriod();
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
for (key in appData) {
    console.log(i + ". appData." + key + " = " + appData[key]);
    i++;
}

function validBoolean(ask) {
    let boolAsk;
    do {
        boolAsk = confirm(ask);
    } while (boolAsk !== true);
    return boolAsk;
}

function validString(ask, tmpStr) {
    let str;
    do {
        str = prompt(ask, tmpStr);
    } while (isNaN(str) === false || str == '' || str == null);

    return str;
}

function validNumber(ask, tmpValue) {
    let value;
    do {
        value = +prompt(ask, tmpValue);
    } while (isNaN(value) === true || value == '' || value == null);
    return value;
}

function validExpenses(q, tmpValue) {
    let arr,
        result;
    do {
        arr = prompt(q, tmpValue).replace(" ", "").split(",");
        result = arr.filter(arrNum => isNaN(arrNum) === false);

    } while (arr.length != result.length || result.length == 0 || arr == '' || arr == null);
    return arr;
}

console.log(Object.entries(appData.expenses)
    .map(item => item[0])
    .join(" ")
    .split(/\s+/).map(arr => arr[0].toUpperCase() + arr.substring(1))
    .join(', ')
);
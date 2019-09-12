let appData = {
    start: function () {
        let money;
        do {
            money = prompt("Ваш месячный доход?");
        } while (isNaN(money) || money == '' || money == null);
        appData.budget = money;
        appData.getExpensesMonth();
        appData.getIncome();
        appData.getDeposit();
        appData.getStatusIncome();
    },
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    incomeMonth: 0,
    income: {},
    depositYear: 0,
    deposit: {},
    mission: 200000,
    period: 1,
    getExpensesMonth: function () {
        appData.expensesMonth = appData.asking();
        return appData.expensesMonth;
    },
    getIncome: function () {
        let question, tmpName, tmpValue;
        question = appData.validBoolean("Есть ли у вас дополнительный заработок?");
        tmpName = appData.validString("Откуда у вас дополнительный заработок?", "freelance");
        tmpValue = appData.validNumber("Сколько денег?", 100000);
        appData.income[tmpName] = parseInt(tmpValue);
        appData.incomeMonth = appData.income[tmpName];
    },
    getDeposit: function () {
        let question, tmpName, tmpValue;
        question = appData.validBoolean("Есть ли у вас депозит в банке?");
        tmpName = appData.validString("Какой тариф депозита", " VIP");
        tmpValue = appData.validNumber("Сумма на счету", 10000);
        appData.deposit[tmpName] = parseInt(tmpValue);
        appData.depositYear = Math.floor((appData.deposit[tmpName] * 0.5 * 365) / (365 * 100));
    },
    asking: function () {
        let sum = 0, expenses;
        appData.expenses = {};
        for (let i = 0; i < 2; i++) {
            if (i === 0) {
                expenses = appData.validString("Введите обязательную статью расходов?", "food");
            } else if (i === 1) {
                expenses = appData.validString("Введите обязательную статью расходов?", "water");
            }
            let tmp;
            tmp = appData.validNumber("Во сколько это обойдется", 5000);
            appData.expenses[expenses] = tmp;
        }
        for (key in appData.expenses) {
            sum += appData.expenses[key];
        }
        return sum;
    },
    getBudget: function () {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
        return appData.budget - appData.expensesMonth;
    },
    getTargetMonth: function () {
        return Math.ceil(appData.mission / appData.getBudget());
    },
    getStatusIncome: function () {
        if (appData.budgetDay >= 800) {
            return "Высокий уровень дохода";
        } else if (appData.budgetDay >= 300 && appData.budgetDay < 800) {
            return "Средний уровень дохода";
        } else if (appData.budgetDay >= 0 && appData.budgetDay < 300) {
            return "Низкий уровень дохода";
        } else if (appData.budgetDay < 0) {
            return "Что-то пошло не так.";
        }
    },
    accumulateMonth: function () {
        return appData.budget - appData.expensesMonth;
    },
    budgetPeriod: function () {
        return appData.budget * appData.period;
    },
    expensesPeriod: function () {
        let expensesAmount = appData.getExpensesMonth();
        return expensesAmount * appData.period;
    },
    incomePeriod: function () {
        return appData.budgetPeriod() - appData.expensesPeriod();
    },
    validBoolean: function (ask) {
        let boolAsk;
        do {
            boolAsk = confirm(ask);
        } while (boolAsk !== true);
        return boolAsk;
    },
    validString: function (ask, tmpStr) {
        let str;
        do {
            str = prompt(ask, tmpStr);
        } while (isNaN(str) === false || str == '' || str == null);

        return str;
    },
    validNumber: function (ask, tmpValue) {
        let value;
        do {
            value = +prompt(ask, tmpValue);
        } while (isNaN(value) === true || value == '' || value == null);
        return value;
    },
    validExpenses: function (q, tmpValue) {
        let arr,
            result;
        do {
            arr = prompt(q, tmpValue).replace(" ", "").split(",");
            result = arr.filter(arrNum => isNaN(arrNum) === false);

        } while (arr.length != result.length || result.length == 0 || arr == '' || arr == null);
        return arr;
    }
};
appData.start();

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
console.log(Object.entries(appData.expenses)
    .map(item => item[0])
    .join(" ")
    .split(/\s+/).map(arr => arr[0].toUpperCase() + arr.substring(1))
    .join(', ')
);
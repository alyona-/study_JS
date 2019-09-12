let appData = {
    start: function () {
        let money;
        do {
            money = prompt("Ваш месячный доход?");
        } while (isNaN(money) || money == '' || money == null);
        appData.budget = money;
        appData.getExpensesMonth();
    },
    budget: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    period: 1,
    deposit: false,
    mission: 200000,
    income: "500000",
    budgetDay: 0,
    getExpensesMonth: function () {
        appData.expensesMonth = appData.asking();
        return appData.expensesMonth;
    },
    asking: function () {
        let sum = 0, expenses = null;
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
        appData.expensesAmount = appData.getExpensesMonth();
        return appData.expensesAmount * appData.period;
    },
    incomePeriod: function () {
        return appData.budgetPeriod() - appData.expensesPeriod();
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
for (let key in appData) {
    console.log(i + ". appData." + key + " = " + appData[key]);
    i++;
}
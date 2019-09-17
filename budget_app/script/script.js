'use strict';

let start = document.getElementById("start"),
    cancel = document.getElementById("cancel"),
    btnPlus = document.getElementsByTagName("button"),
    incomePlus = btnPlus[0]
    , expensesPlus = btnPlus[1],
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    depositCheck = document.querySelector('#deposit-check'),
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    accumulatedMonthValue = document.getElementsByClassName('accumulated_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpenses = document.querySelector('.additional_expenses'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    incomeItem = document.querySelectorAll('.income-items'),
    dataInputItems = document.querySelectorAll('.data input'),
    calcBlock = document.querySelector('.calc');

let appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    expensesMonth: 0,
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    period: 1,
    mission: 0,
    targetMonth: 0,

    start: function (event) {
        if (salaryAmount.value === '') {
            event.preventDefault();
            return;
        }
        appData.budget = +salaryAmount.value;
        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();

        appData.getAddExpenses();
        appData.getAddIncome();

        appData.getBudget();
        appData.getMission();
        appData.showResult();

        let dataInputItems = document.querySelectorAll('.data input');
        dataInputItems.forEach(function (item) {
            if (item.className !== "period-select") {
                item.disabled = true;
            }
        });
        start.style.display = 'none';
        cancel.style.display = 'block';
    },
    showResult: function () {
        appData.period = periodSelect.value;
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(", ");
        additionalIncomeValue.value = appData.addIncome.join(", ");
        targetMonthValue.value = Math.ceil(appData.getTargetMonth());
        incomePeriodValue.value = appData.calcPeriod();

        periodSelect.addEventListener('input', function () {
            appData.period = +periodSelect.value;
            incomePeriodValue.value = appData.calcPeriod();
        });
    },
    addExpensesBlock: function () {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');

        expensesItems[expensesItems.length - 1].children[0].value = null;
        expensesItems[expensesItems.length - 1].children[1].value = null;
        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    },

    addIncomeBlock: function () {
        let cloneIncomeItem = incomeItem[0].cloneNode(true);
        incomeItem[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItem = document.querySelectorAll('.income-items');

        incomeItem[incomeItem.length - 1].children[0].value = null;
        incomeItem[incomeItem.length - 1].children[1].value = null;

        if (incomeItem.length === 3) {
            incomePlus.style.display = 'none';
        }
    },
    getExpenses: function () {
        expensesItems.forEach(function (item) {
            let itemExpenses = item.querySelector('.expenses-title').value,
                cashExpenses = +item.querySelector('.expenses-amount').value;

            if (itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = cashExpenses;
                appData.expensesMonth += cashExpenses;
            }
        });
    },
    getIncome: function () {
        incomeItem.forEach(function (item) {
            let itemIncome = item.querySelector('.income-title').value,
                cashIncome = +item.querySelector('.income-amount').value;

            if (itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = cashIncome;
                appData.incomeMonth += cashIncome;
            }
        });
    },
    getAddExpenses: function () {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function (item) {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        })
    },
    getAddIncome: function () {
        additionalIncomeItem.forEach(function (item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        })
    },
    getInfoDeposit: function () {
        appData.deposit = confirm("Есть ли у вас депозит в банке?");
        if (appData.deposit) {
            appData.percentDeposit = prompt("Какой годовой процент?", "10");
            appData.moneyDeposit = prompt("Какая сумма заложена", 100000);
        }
    },
    getExpensesMonth: function () {
        for (let key in appData.expenses) {
            appData.expensesMonth += appData.expenses[key];
        }
    },

    getBudget: function () {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.round(appData.budgetMonth / 30);
    },
    getTargetMonth: function () {
        return appData.mission / appData.budgetMonth;
    },
    getStatusIncome: function () {
        if (appData.budgetDay > 800) {
            return "Высокий уровень дохода";
        } else if (appData.budgetDay > 300) {
            return "Средний уровень дохода";
        } else if (appData.budgetDay > 0) {
            return "Низкий уровень дохода";
        } else {
            return "Что-то пошло не так";
        }
    },
    getMission: function () {
        if (isNaN(targetAmount.value) || targetAmount.value === '' || targetAmount.value == null) {

        } else {
            appData.mission = +targetAmount.value;
            appData.targetMonth = appData.mission / appData.budgetMonth;
        }
    },
    calcPeriod: function () {
        return appData.budgetMonth * appData.period;
    }
};
start.addEventListener('click', appData.start);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('change', function (event) {
    periodAmount.textContent = event.target.value;
}, false);
calcBlock.addEventListener('keypress', function isValidText(e) {
    let regexp;
    if (e.target.getAttribute("placeholder") === "Наименование") {
        regexp = /^[А-Яа-я]+$/;
    } else if (e.target.getAttribute("placeholder") === "Сумма") {
        regexp = /[\d]/;
    }
    if (!regexp.test(e.key)) {
        e.preventDefault();
        return false;
    }
});
console.log("Расходы за месяц: " + appData.expensesMonth);

if (appData.getTargetMonth() > 0) {
    console.log("Цель будет достигнута за " + Math.ceil(appData.getTargetMonth()) + " месяца");
} else {
    console.log("Цель не будет достигнута");
}
console.log(appData.getStatusIncome());
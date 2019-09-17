'use strict';

let start = document.getElementById("start"),
    cancel = document.getElementById("cancel"),
    btnPlus = document.getElementsByTagName("button"),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
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
    mainItems = document.querySelectorAll('.main input'),
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

    start: function () {
        if (salaryAmount.value === '') {
            return;
        }
        this.budget = +salaryAmount.value;
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        this.getMission();
        this.showResult();
        start.style.display = 'none';
        cancel.style.display = 'block';
        let input = document.querySelectorAll('.calc input');
        input.forEach(function (item) {
            if (item.className !== "period-select") {
                item.disabled = true;
            }
        });

    },

    cancel: function () {
        let input = document.querySelectorAll('.calc input');
        let button = document.querySelectorAll('button');
        input.forEach(function (item) {
            item.value = '';
            item.disabled = false;
        });
        button.forEach(function (item) {
            item.style.display = '';
        });
        periodSelect.value = 1;
        periodAmount.textContent = periodSelect.value;
        this.removeExpensesBlock();
        this.removeIncomeBlock();
        this.expensesMonth = 0;
        this.incomeMonth = 0;
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        depositCheck.checked = false;
        this.deposit = false;

    },

    showResult: function () {
        this.period = +periodSelect.value;
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(", ");
        additionalIncomeValue.value = this.addIncome.join(", ");
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcPeriod();
        periodSelect.addEventListener('input', this.calcPeriod.bind(this));
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

    removeExpensesBlock: function () {
        let expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length > 1) {
            for (let i = expensesItems.length; i > 1; i--) {
                expensesItems[0].parentNode.removeChild(expensesItems[i - 1]);
            }
        }
        this.expenses = {};
        this.addExpenses = [];
    },

    removeIncomeBlock: function () {
        let incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length > 1) {
            for (let i = incomeItems.length; i > 1; i--) {
                incomeItems[0].parentNode.removeChild(incomeItems[i - 1]);
            }
        }
        this.income = {};
        this.addIncome = [];
    },
    getExpenses: function () {
        expensesItems.forEach(function (item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = +item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = cashExpenses;
                appData.expensesMonth += cashExpenses;
            }
        });
    },

    getIncome: function () {
        incomeItem.forEach(function (item) {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = +item.querySelector('.income-amount').value;
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
        this.deposit = confirm("Есть ли у вас депозит в банке?");
        if (this.deposit) {
            this.percentDeposit = prompt("Какой годовой процент?", "10");
            this.moneyDeposit = prompt("Какая сумма заложена", 100000);
        }
    },

    getExpensesMonth: function () {
        for (let key in this.expenses) {
            this.expensesMonth += this.expenses[key];
        }
    },

    getBudget: function () {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.round(this.budgetMonth / 30);
    },

    getTargetMonth: function () {
        return this.mission / this.budgetMonth;
    },

    getStatusIncome: function () {
        if (this.budgetDay > 800) {
            return "Высокий уровень дохода";
        } else if (this.budgetDay > 300) {
            return "Средний уровень дохода";
        } else if (this.budgetDay > 0) {
            return "Низкий уровень дохода";
        } else {
            return "Что-то пошло не так";
        }
    },

    getMission: function () {
        if (isNaN(targetAmount.value) || targetAmount.value === '' || targetAmount.value == null) {
        } else {
            this.mission = +targetAmount.value;
            this.targetMonth = this.mission / this.budgetMonth;
        }
    },

    calcPeriod: function () {
        appData.period = +periodSelect.value;
        incomePeriodValue.value = this.budgetMonth * this.period;
        return this.budgetMonth * this.period;
    }
};

start.addEventListener('click', appData.start.bind(appData));
cancel.addEventListener('click', appData.cancel.bind(appData));

expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);

periodSelect.addEventListener('input', function (event) {
    periodAmount.textContent = event.target.value;
}, false);

calcBlock.addEventListener('keypress', function (e) {
  //  alert(e.key);
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
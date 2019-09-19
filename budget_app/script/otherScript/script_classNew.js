'use strict';

class AppData {
    constructor() {
        const start = document.getElementById("start"),
            cancel = document.getElementById("cancel"),
            btnPlus = document.getElementsByTagName("button"),
            incomePlus = btnPlus[0],
            expensesPlus = btnPlus[1],
            salaryAmount = document.querySelector('.salary-amount'),
            depositCheck = document.querySelector('#deposit-check'),
            budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
            budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
            expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
            additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
            additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
            incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
            targetMonthValue = document.getElementsByClassName('target_month-value')[0],
            targetAmount = document.querySelector('.target-amount'),
            periodSelect = document.querySelector('.period-select'),
            periodAmount = document.querySelector('.period-amount'),
            calcBlock = document.querySelector('.calc');

        let additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
            expensesItems = document.querySelectorAll('.expenses-items'),
            additionalExpensesItem = document.querySelector('.additional_expenses-item'),
            incomeItem = document.querySelectorAll('.income-items');

        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.expensesMonth = 0;
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.period = 1;
        this.mission = 0;
        this.targetMonth = 0;

        this.start = function () {
            if (salaryAmount.value === '') {
                return;
            }
            this.budget = +salaryAmount.value;
            this.getSomeObject('.expenses-items');
            this.getSomeObject('.income-items');
            this.getAddObject('.additional_income-item');
            this.getAddObject('.additional_expenses-item');
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
        };

        this.cancel = function () {
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
            this.removeSomeBlock();
            this.expensesMonth = 0;
            this.incomeMonth = 0;
            this.budget = 0;
            this.budgetDay = 0;
            this.budgetMonth = 0;
            depositCheck.checked = false;
            this.deposit = false;
            this.percentDeposit = 0;
            this.moneyDeposit = 0;
            this.period = 1;
            this.mission = 0;
            this.targetMonth = 0;
            targetAmount.value = null;
            targetMonthValue.value = null;
        };

        this.showResult = function () {
            this.period = +periodSelect.value;
            budgetMonthValue.value = this.budgetMonth;
            budgetDayValue.value = this.budgetDay;
            expensesMonthValue.value = this.expensesMonth;
            additionalExpensesValue.value = this.addExpenses.join(", ");
            additionalIncomeValue.value = this.addIncome.join(", ");
            targetMonthValue.value = Math.ceil(this.getTargetMonth());
            incomePeriodValue.value = this.calcPeriod();
            periodSelect.addEventListener('input', this.calcPeriod.bind(this));
        };

        this.addSomeBlock = function () {
            let classBlock = this.classList.toString().split(" ")[1],
                cloneSomeItem, someItem, someButton;
            if (classBlock === 'income_add') {
                someItem = incomeItem;
                someButton = incomePlus;
            } else if (classBlock === 'expenses_add') {
                someItem = expensesItems;
                someButton = expensesPlus;
            }
            cloneSomeItem = someItem[0].cloneNode(true);
            someItem[0].parentNode.insertBefore(cloneSomeItem, someButton);
            someItem = document.querySelectorAll('.' + cloneSomeItem.className);
            someItem[someItem.length - 1].children[0].value = null;
            someItem[someItem.length - 1].children[1].value = null;
            if (someItem.length === 3) {
                someButton.style.display = 'none';
            }
            if (classBlock === 'income_add') {
                incomeItem = someItem;
            } else if (classBlock === 'expenses_add') {
                expensesItems = someItem;
            }
        };

        this.removeSomeBlock = function () {
            for (let i = 0; i < 2; i++) {
                let selector;
                if (i === 0) selector = '.income-items';
                else if (i === 1) selector = '.expenses-items';

                let someItems = document.querySelectorAll(selector);
                if (someItems.length > 1) {
                    for (let j = someItems.length; j > 1; j--) {
                        someItems[0].parentNode.removeChild(someItems[j - 1]);
                    }
                }
            }
            this.expenses = {};
            this.addExpenses = [];
            this.income = {};
            this.addIncome = [];
        };

        this.getSomeObject = function (selector) {
            let someItems = document.querySelectorAll(selector),
                objectName = selector.match(/[A-Za-z]+/)[0];
            someItems.forEach((item) => {
                let itemSome = item.querySelector(`.${objectName}-title`).value,
                    cashSome = +item.querySelector(`.${objectName}-amount`).value;

                if (itemSome !== '' && cashSome !== '') {
                    if (objectName === 'expenses') {
                        this.expenses[itemSome] = cashSome;
                        this.expensesMonth += cashSome;

                    } else if (objectName === 'income') {
                        this.income[itemSome] = cashSome;
                        this.incomeMonth += cashSome;
                    }

                }
            });
        };

        this.getAddObject = function (selector) {
            let someItem;
            if (selector === '.additional_expenses-item') {
                someItem = additionalExpensesItem.value.split(",");
            } else {
                someItem = additionalIncomeItem;
            }
            someItem.forEach((item) => {
                if (selector === '.additional_income-item') {
                    let itemValue = item.value.trim();
                    if (itemValue !== '') this.addIncome.push(itemValue);
                } else if (selector === '.additional_expenses-item') {
                    if (item.trim() !== '') this.addExpenses.push(item.trim());
                }
            });
        };


        this.getInfoDeposit = function () {
            this.deposit = confirm("Есть ли у вас депозит в банке?");
            if (this.deposit) {
                this.percentDeposit = prompt("Какой годовой процент?", "10");
                this.moneyDeposit = prompt("Какая сумма заложена", 100000);
            }
        };

        this.getBudget = function () {
            this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
            this.budgetDay = Math.round(this.budgetMonth / 30);
        };

        this.getTargetMonth = function () {
            return this.mission / this.budgetMonth;
        };

        this.getStatusIncome = function () {
            if (this.budgetDay > 800) {
                return "Высокий уровень дохода";
            } else if (this.budgetDay > 300) {
                return "Средний уровень дохода";
            } else if (this.budgetDay > 0) {
                return "Низкий уровень дохода";
            } else {
                return "Что-то пошло не так";
            }
        };

        this.getMission = function () {
            if (isNaN(targetAmount.value) || targetAmount.value === '' || targetAmount.value == null) {
            } else {
                this.mission = +targetAmount.value;
                this.targetMonth = this.mission / this.budgetMonth;
            }
        };

        this.calcPeriod = function () {
            this.period = +periodSelect.value;
            incomePeriodValue.value = this.budgetMonth * this.period;
            return this.budgetMonth * this.period;
        };

        start.addEventListener('click', appData.start.bind(appData));
        cancel.addEventListener('click', appData.cancel.bind(appData));

        expensesPlus.addEventListener('click', appData.addSomeBlock);
        incomePlus.addEventListener('click', appData.addSomeBlock);

        periodSelect.addEventListener('input', function (event) {
            periodAmount.textContent = event.target.value;
        }, false);

        calcBlock.addEventListener('keypress', function (e) {
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
    }
}


let appData = new AppData();







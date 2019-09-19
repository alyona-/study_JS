class AppData {
    _start = document.getElementById("start");
    _cancel = document.getElementById("cancel");
    _incomePlus = document.getElementsByTagName("button")[0];
    _expensesPlus = document.getElementsByTagName("button")[1];
    _salaryAmount = document.querySelector('.salary-amount');
    _depositCheck = document.querySelector('#deposit-check');
    _depositBank = document.querySelector('.deposit-bank');
    _depositAmount = document.querySelector('.deposit-amount');
    _depositPercent = document.querySelector('.deposit-percent');
    _budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
    _budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
    _expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
    _additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
    _additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
    _incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
    _targetMonthValue = document.getElementsByClassName('target_month-value')[0];
    _targetAmount = document.querySelector('.target-amount');
    _periodSelect = document.querySelector('.period-select');
    _periodAmount = document.querySelector('.period-amount');
    _calcBlock = document.querySelector('.calc');

    _additionalIncomeItem = document.querySelectorAll('.additional_income-item');
    _expensesItems = document.querySelectorAll('.expenses-items');
    _additionalExpensesItem = document.querySelector('.additional_expenses-item');
    _incomeItem = document.querySelectorAll('.income-items');

    constructor() {
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
        this.depositMonth = 0;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.period = 1;
        this.mission = 0;
        this.targetMonth = 0;
    }

    start() {
        if (this._salaryAmount.value === '') {
            return;
        }
        this.budget = +this._salaryAmount.value;
        this.getSomeObject('.expenses-items');
        this.getSomeObject('.income-items');
        this.getAddObject('.additional_income-item');
        this.getAddObject('.additional_expenses-item');
        this.getInfoDeposit();
        this.getBudget();
        this.getMission();
        this.showResult();
        this._start.style.display = 'none';
        this._cancel.style.display = 'block';
        let input = document.querySelectorAll('.calc input');
        input.forEach((item) => {
            if (item.className !== "period-select") {
                item.disabled = true;
            }
        });
    };

    cancel() {
        let input = document.querySelectorAll('.calc input');
        let button = document.querySelectorAll('button');
        input.forEach((item) => {
            item.value = '';
            item.disabled = false;
        });
        button.forEach((item) => {
            item.style.display = '';
        });
        this._periodSelect.value = 1;
        this._periodAmount.textContent = this._periodSelect.value;
        this.removeSomeBlock();
        this.expensesMonth = 0;
        this.incomeMonth = 0;
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.depositMonth = 0;
        this._depositCheck.checked = false;
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this._depositBank.style.display = '';
        this._depositAmount.style.display = '';
        this.period = 1;
        this.mission = 0;
        this.targetMonth = 0;
        this._targetAmount.value = null;
        this._targetMonthValue.value = null;
    };

    showResult() {
        this.period = +this._periodSelect.value;
        this._budgetMonthValue.value = this.budgetMonth;
        this._budgetDayValue.value = this.budgetDay;
        this._expensesMonthValue.value = this.expensesMonth;
        this._additionalExpensesValue.value = this.addExpenses.join(", ");
        this._additionalIncomeValue.value = this.addIncome.join(", ");
        this._targetMonthValue.value = Math.ceil(this.getTargetMonth());
        this._incomePeriodValue.value = this.calcPeriod();
        this._periodSelect.addEventListener('input', this.calcPeriod.bind(this));
    };

    addSomeBlock(e) {
        let classBlock = e.target.classList.toString().split(" ")[1],
            cloneSomeItem, someItem, someButton;
        if (classBlock === 'income_add') {
            someItem = this._incomeItem;
            someButton = this._incomePlus;
        } else if (classBlock === 'expenses_add') {
            someItem = this._expensesItems;
            someButton = this._expensesPlus;
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
            this._incomeItem = someItem;
        } else if (classBlock === 'expenses_add') {
            this._expensesItems = someItem;
        }
    };

    removeSomeBlock() {
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

    getSomeObject(selector) {
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

    getAddObject(selector) {
        let someItem;
        if (selector === '.additional_expenses-item') {
            someItem = this._additionalExpensesItem.value.split(",");
        } else {
            someItem = this._additionalIncomeItem;
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

    getBudget() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + this.depositMonth;
        this.budgetDay = Math.round(this.budgetMonth / 30);
    };

    getTargetMonth() {
        return this.mission / this.budgetMonth;
    };

    getStatusIncome() {
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

    getInfoDeposit() {
        if (this.deposit) {
            this.percentDeposit = +this._depositPercent.value;
            this.moneyDeposit = +this._depositAmount.value;

            if ((isNaN(this.percentDeposit) || this.percentDeposit === '' || this.percentDeposit == null) &&
                (isNaN(this.moneyDeposit) || this.moneyDeposit === '' || this.moneyDeposit == null)
            ) {
            } else {
                this.depositMonth = Math.floor((this.moneyDeposit * this.percentDeposit * 30) / (365 * 100));
            }
        }
    };

    getMission() {
        if (isNaN(this._targetAmount.value) || this._targetAmount.value === '' || this._targetAmount.value == null) {
        } else {
            this.mission = +this._targetAmount.value;
            this.targetMonth = this.mission / this.budgetMonth;
        }
    };

    calcPeriod() {
        this.period = +this._periodSelect.value;
        this._incomePeriodValue.value = this.budgetMonth * this.period;
        return this.budgetMonth * this.period;
    };

    eventListener() {
        let _this = this;
        this._start.addEventListener('click', this.start.bind(_this));
        this._cancel.addEventListener('click', this.cancel.bind(_this));
        this._expensesPlus.addEventListener('click', (e) => {
            _this.addSomeBlock.call(_this, e);
        });
        this._incomePlus.addEventListener('click', (e) => {
                _this.addSomeBlock.call(_this, e);
            }
        );
        this._periodSelect.addEventListener('input', (e) => {
            this._periodAmount.textContent = e.target.value;
        });
        this._calcBlock.addEventListener('keypress', (e) => {
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
        let depositCheck = this._depositCheck,
            depositBank = this._depositBank,
            depositAmount = this._depositAmount,
            depositPercent = this._depositPercent;
        this._depositCheck.addEventListener('change', function () {

            if (depositCheck.checked) {
                depositBank.style.display = 'inline-block';
                depositAmount.style.display = 'inline-block';
                appData.deposit = 'true';
                depositBank.addEventListener('change', function () {
                    let selectIndex = this.options[this.selectedIndex].value;
                    if (selectIndex === "other") {
                        depositPercent.style.display = 'inline-block';
                        depositPercent.value = '';
                        depositPercent.disabled = false;
                    } else {
                        depositPercent.style.display = '';
                        depositPercent.value = selectIndex;
                    }
                });
            } else {
                depositBank.style.display = '';
                depositAmount.style.display = '';
                depositAmount.value = '';
                appData.deposit = 'false';
                depositPercent.disabled = true;
                depositPercent.value = '';
            }
        });
    };
}

let appData = new AppData();
appData.eventListener();
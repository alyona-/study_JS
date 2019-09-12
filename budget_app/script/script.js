let start = document.getElementById("start"),
    btn_plus = document.getElementsByTagName("button"),
    income_add, expenses_add,
    depositCheck =document.querySelector('#deposit-check'),
    result =document.querySelector('.result'),
    inputBudgetValue = result.querySelectorAll('div input'),
    additional_incomeItem = document.querySelectorAll('.additional_income-item'),
    budgetMonth = document.querySelector('.budget_month-value'),
    target = document.querySelector('.target-amount'),
    possibleExpense =document.querySelector('.additional_expenses-item'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesAmount =document.querySelector('.expenses-amount'),
    addIncome =document.querySelectorAll('.additional_income-item'),
    incomeTitle = document.querySelector('.income-title'),
    incomeAmount= document.querySelector('.income-amount'),
    range = document.querySelector('.period-select');

for(let i=0; i<btn_plus.length;i++){
    let classList = btn_plus[i].classList.toString();
    classList=classList.split(' ');
    for(let j in classList){
        if(classList[j] == 'income_add') {
            income_add =btn_plus[i];
        } else if(classList[j] == 'expenses_add'){
            expenses_add=btn_plus[i];
        }
    }
}


function collectToArray (collect) {
    let arr = [];
    for (let i = collect.length >>> 0; i--;) {
        arr[i] = collect[i];
    }
    return arr;

}
inputBudgetValue = collectToArray(inputBudgetValue).filter(item =>item.classList.toString().split(" ")
    .filter(item =>item.indexOf('-value')!==-1)
);

let index1, index2,
    class1='budget_day-value', class2='target_month-value';

elem =collectToArray(inputBudgetValue);
for(let i=0; i<elem.length; i++) {
    let classList = elem[i].classList.toString();
    classList=classList.split(' ');

    for (let j in classList) {
        if (classList[j] == class1) {
            index1 = i;
        } else if (classList[j] == class2) {
            index2 = i;
        }
    }

}
inputBudgetValue = elem.slice(index1, index2+1);
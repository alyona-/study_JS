'use strict';

let promise = new Promise((resolve, reject) => {
    let str ='dfdsfdfsdfd',
        result =str.match(/\d/g);
        console.log('result ='+result);

        if(result) {
            return resolve(result);

        }else {
            return  reject(result);

        }

});

promise
    .then((result) => {
    console.log("Регулярное выражение выоплнилось успешно" +result);
}, (result) => {
    console.log("Регялрное выражение не выполнилось" +result);
})
    .finally(() => {
      console.log("Блок кода выполнится в любом случае");
});
const r =(() =>{
    setTimeout(() =>{
        console.log("time");
    },1000);
})();


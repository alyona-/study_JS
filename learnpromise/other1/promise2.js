//Promise - обещания
const doUniversity = (docs) => {

    const promise = new Promise((resolve, reject) => {
        if (docs) {
            console.log("Проходит рассмотрение документов");
            setTimeout(() => {
                if (Math.random() > 0.3) {
                    let result = 'Принят';
                    resolve(result);
                } else {
                    reject('Отказано');
                }
            }, 3000);
        } else {
            //нехватает документов
            reject('Отказано, нехватает документов');
        }
    });

    return promise;

};

const doArmy = (docs) => {

   const promise = new Promise((resolve, reject) => {
       if(docs){
           console.log("Военком думает ...");
           setTimeout(() => {
               if(docs === 'Принят'){
                   resolve('Отсрочка');
                   console.log('Отсрочка');
               }else {
                   reject('Повестка');

               }
           }, 2000);
       }else {
           reject('Повестка');
       }
   }) ;

   return promise;
};

const doWork = (docs) => {

    const promise = new Promise( (resolve, reject) => {
        console.log("Директор google думает ...");
        console.log("Документы от военкомата : "+docs);
        setTimeout( () => {
            if(Math.random() > 0.8) {
                let result = "Приглашен на собеседование в Google в понедельник";
                resolve(result);
                console.log(result);
            }else {
                reject("Отказано иди в Яндекс!");
            }
        }, 3000);
    });

    return promise;
};

const documents =['Паспорт', 'Aттестат'];


/*
* Метод then - обрабатывает последствия промиса, в качестве параметров принимает 2 функции,
* 1-ая - функция выполняется если промис выполнится
* 2-ая - функция выполняется если  промис не выполнится
*
* resolve - ответ
* reason - причина
* reject - отказ
* */
doUniversity(documents)
    .then((result) => {
    console.log(result);
    return result;
}, (reason) =>{
    console.log(reason);
})
    .then(doArmy)
    .then(doWork)
    .catch( (reason) =>{
        console.log(reason);
    });
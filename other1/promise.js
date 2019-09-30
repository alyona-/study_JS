//Promise - обещания
const doUniversity = (docs, resolve, reject) => {

    if(docs){
        console.log("Проходит рассмотрение документов");
        setTimeout(() =>{
            if(Math.random() >0.3){
                let result = 'Принят';
                resolve(result);
            } else{
                reject('Отказано');
            }
        },3000);
    }else {
        //нехватает документов
        reject('Отказано, нехватает документов');
    }

};

const doArmy = (docs, resolve, reject) => {
    if(docs){
        console.log("Военком думает ...");
        setTimeout(() => {
            if(docs === 'Принят'){
                resolve('Отсрочка');
            }else {
                reject('Повестка');
            }
        }, 2000);
    }else {
        reject('Повестка');
    }
};

const doWork = (docs, resolve, reject) => {
    console.log("Директор google думает ...");

    setTimeout( () => {
        if(Math.random() > 0.3) {
            let result = "Приглашен на собеседование в Google в понедельник";
            resolve(result);
        }else {
            reject("Отказано иди в Яндекс!");
        }
    }, 3000);
};

const documents =['Паспорт', 'Aттестат'];

doUniversity(documents, (result) => {
    console.log(result);
    doArmy(result, (militaryDocs) => {
        console.log(militaryDocs);
        doWork(militaryDocs, (data) => {
            console.log(data);
        }, (reason) => {
            console.error(reason);
        });
    }, (reason) => {
        console.error(reason);
    });
}, (reason) => {
    console.error(reason);
});
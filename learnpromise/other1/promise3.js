//Promise - обещания
const doUniversity = (docs) => {

    return new Promise((resolve, reject) => {
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

};

const doArmy = (docs) => {

    return new Promise((resolve, reject) => {
        if (docs) {
            console.log("Военком думает ...");
            setTimeout(() => {
                if (docs === 'Принят') {
                    resolve('Отсрочка');
                    console.log('Отсрочка');
                } else {
                    reject('Повестка');

                }
            }, 2000);
        } else {
            reject('Повестка');
        }
    });

};

const doWork = (docs) => {

    return new Promise((resolve, reject) => {
        console.log("Директор google думает ...");
        console.log("Документы от военкомата : " + docs);
        setTimeout(() => {
            if (Math.random() > 0.8) {
                let result = "Приглашен на собеседование в Google в понедельник";
                resolve(result);
                console.log(result);
            } else {
                reject("Отказано иди в Яндекс!");
            }
        }, 3000);
    });

};

const dance = (docs) => {
  console.log('потанцевали');
 // return Promise.resolve(docs);
 // return Promise.reject(docs);
  return docs;
};

const documents = ['Паспорт', 'Aттестат'];


const doWorking = (company) => {
  return new Promise((resolve, reject) => {
      const time = Math.ceil(Math.random() * 5000);
     setTimeout(() => {
         if(time % 5){
             resolve(company);
         }else {
             reject(company);
         }

     }, time);
  });
};

const hh = doWorking('HH'),
    yandex = doWorking('Yandex'),
    ozone = doWorking('Ozone'),
    pikabu = doWorking('Pikabu'),
    politics = doWorking('Гос Дума');

Promise.race([hh, yandex, ozone,pikabu,politics])
    .then(result =>console.log(`Тебя пригласили на собеседование в : ${result}`))
    .catch(result => console.error(`Компания ${result} нам отказала`));
/*
* Метод then - обрабатывает последствия промиса, в качестве параметров принимает 2 функции,
* 1-ая - функция выполняется если промис выполнится
* 2-ая - функция выполняется если  промис не выполнится
*
* resolve - ответ
* reason - причина
* reject - отказ
* catch - обрабатывает все вызовы, запускается в любом случае, если какой-то из промисов вернет reject или произойдет ошибка,
* т.е. catch ловит любую ошибку и функцию reject
* then записанная после catch выполняется в любом случае
*
* ES 2018 после catch then можно писать finally он будет работать также как then после catch
*
* Промисы лучше коллбэков из-за читабильности кода,
* не нужно в каждом коллбеке обрабатывать ошибку, 1 catch на все промисы
*
* Метод all - принимает в качестве параметра массив промисов, ожидает выполнения всех, только в этом случае выполнится then
* race - ожидает выполнение только первого промиса, какой первый выполнится, тот и попадет в then
* */
doUniversity(documents)
    .then((result) => {
        console.log(result);
        return result;
    })
    .then(doArmy)
    .then(dance)
    .then(doWork)
    .catch((reason) => console.error(reason))
    .finally(() =>console.warn("Выполнится в любом случае"));

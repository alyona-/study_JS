const foo1 = () => {
    console.log('Загрузили белье в стиральную машину');
    foo2(foo3);
    foo4();
};

const foo2 = (callback) => {
    setTimeout(() => {
        console.log('Закончилась стирка');
        callback();
    }, 2000);

};

const foo3 = () => {
    console.log('Развесить белье на балконе');
};

const foo4 = () => {
    setTimeout(() =>{
        console.log("помыл пол");
    },300);
};


foo1();
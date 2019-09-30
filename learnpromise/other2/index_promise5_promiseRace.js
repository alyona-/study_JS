//Версия http request написанная с помощью AJAX и ПРОМИСОВ

const output  = document.getElementById('output');

const getData = (url) => {

    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open('GET', url);
        request.addEventListener('readystatechange', () => {
            if(request.readyState !== 4) {
                return;
            }
            if(request.status === 200){
                const response= JSON.parse(request.responseText);
                resolve(response);
            }else {
                reject(request.statusText);
            }
        });
        request.send();
    });

};

const outputPhotos = (data) => {
    // const random = Math.floor(Math.random() * data.length);
    // const obj = data[random];
    // console.log(obj);
    // output.innerHTML = `<h4>${data.title}</h4><img src="${data.thumbnailUrl}" alt="${data.title}">`;
    output.insertAdjacentHTML('beforebegin',`<h4>${data.title}</h4><img src="${data.thumbnailUrl}" alt="${data.title}">`);
};

const urlPhotos = "https://jsonplaceholder.typicode.com/photos";


const oneImg = getData("https://jsonplaceholder.typicode.com/photos/1"),
    twoImg = getData("https://jsonplaceholder.typicode.com/photos/2");

/*
//выводить буду только тогда, когда пришел ответ от 2-ух картинок Promise.all
Promise.all([oneImg, twoImg]); */

//Так картинки отрабатывают по 1
// oneImg
//     .then(outputPhotos)
//     .catch(error => console.log(error));
//
// twoImg
//     .then(outputPhotos)
//     .catch(error => console.log(error));


Promise.race([oneImg, twoImg])
    .then(outputPhotos)
    .catch((error) =>console.log(error));


/*
getData(urlPhotos)
    .then(outputPhotos)
    .catch(error=>console.error(error)); */
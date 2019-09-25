document.addEventListener('DOMContentLoaded', () => {
    'use strict';


 //   alert('hello');
    const select = document.getElementById('cars'),
        output= document.getElementById('.output');

    select.addEventListener('change', ( ) => {

        const request = new XMLHttpRequest();
        request.open('GET', './cars.json');
        request.setRequestHeader('Content-type', 'application/json');
        request.send();
        request.addEventListener('readystatechange', (event) =>{
            if(request.readyState === 4 && request.status === 200){
                console.log(request.status);
                console.log(request.statusText);
                console.log(request.response);
                console.log(request.responseText);
            }

        });

    });


});

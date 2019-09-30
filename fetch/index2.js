document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const select = document.getElementById('cars'),
        output = document.getElementById('output');


    /*
    * mode - same-origin -работает в 1 домене
    * */
    select.addEventListener('change', () =>{
        fetch('./cars.json', { method: 'GET', mode: 'same-origin', cache: 'default', credentials:'same-origin', headers:{'Content-type':'application/json'},
        redirect:'follow', referrer:'client', body:JSON.stringify(data)})
            .then((response) =>{
                if(response.status !== 200) {
                    throw new Error('status network not 200.');
                }
                return response.json();
            })
            .then((data) => {
                data.cars.forEach((item) => {
                    if(item.brand === select.value) {
                        const {brand, model, price} =item;
                        output.innerHTML = `Тачка ${brand} ${model} <br> 
                              Цена ${price}$`;
                    }
                });
            })
            .catch((error) => console.error(error));
    });
});
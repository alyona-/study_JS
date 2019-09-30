document.addEventListener('DOMContentLoaded', () => {
   'use strict';

   const select = document.getElementById('cars'),
       output = document.getElementById('output');

   select.addEventListener('change', () =>{
       fetch('./cars.json')
           .then((response) =>{
               if(response.status !== 200) {
                   throw new Error('status network not 200.');
               }
              // console.log(response.text());
            //   return response.text();
               return response.json();
          //     return response.blob();
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
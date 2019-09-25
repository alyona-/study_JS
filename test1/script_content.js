document.addEventListener('DOMContentLoaded', () => {
   'use strict';

   // console.log(1);
   const select = document.getElementById('cars'),
       output= document.getElementById('.output');

   const request = new XMLHttpRequest();
   console.log(request.readyState);
  // request.open('GET', './cars.json', true, login, password);
   request.open('GET', './cars.json');

   //Content  -> Content-type   , format = application/json
   request.setRequestHeader('Content-type', 'application/json');

   request.send();

   /*
   * request.addEventLiestener('loadstart') - событие выполняется до отправки запроса
   * request.addEventLiestener('progress') - в момент получения ответа
   * request.addEventLiestener('abort') -при отмене события
   * request.addEventLiestener('load') -если запрос успешно завершен
   * request.addEventLiestener('error') -если запрос  завершен
   * request.addEventLiestener('loadend') -
   * request.addEventLiestener('readystatechange') -
   * */


});

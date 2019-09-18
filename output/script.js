window.addEventListener('DOMContentLoaded', function () {
    'use strict';
    let textCon = document.querySelector('.textResult');

    function countTimer(newYear, today) {
        let day;

        function getCountDay(newYear, today) {
            let dateNY = newYear.getTime(),
                dateNow = today.getTime(),
                timeRemaining = (dateNY - dateNow) / 1000;
            if (timeRemaining < 0)
                day = 0;
            else
                day = Math.floor(timeRemaining / 60 / 60 / 24);
            return day;
        }

        function getWeek(todayNum) {
            let dayArr = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Cуббота'];
            return dayArr[todayNum];
        }

        function hello(hours) {
            let strHello;
            if (hours >= 0 && hours < 4) {
                strHello = 'Доброй ночи';
            } else if (hours > 3 && hours < 12) {
                strHello = 'Доброе утро';
            } else if (hours > 11 && hours < 16) {
                strHello = 'Добрый день';
            } else if (hours > 15 && hours < 24) {
                strHello = 'Добрый  вечер';
            }
            return strHello;
        }

        function updateClock() {
            let today = new Date(),
                ny = new Date('01 january ' + (today.getFullYear() + 1));
            textCon.innerHTML = `${hello(today.getHours())}<br>
                       Сегодня: ${getWeek(today.getDay())}<br>
                       Текущее время: ${today.toLocaleTimeString('en')}<br>
                        До нового года осталось дней: ${getCountDay(ny, today)} дней`;
            clearTimeout(idTimeout);
        }

        updateClock();
    }

    let idTimeout = setTimeout(countTimer, 10);
});
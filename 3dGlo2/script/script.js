window.addEventListener('DOMContentLoaded', function () {
    'use strict';

    //Таймер
    function countTimer(deadline) {
        let seconds, minutes, hours, day,
            timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds'),
            count = 0;

        function getTimeRemaining() {
            let dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000;
            if (timeRemaining < 0) {
                seconds = 0;
                minutes = 0;
                hours = 0;
                day = 0;
            } else {
                seconds = Math.floor(timeRemaining % 60);
                minutes = Math.floor((timeRemaining / 60) % 60);
                hours = Math.floor(timeRemaining / 60 / 60);
                day = Math.floor(timeRemaining / 60 / 60 / 24);
            }
            return {timeRemaining, hours, minutes, seconds};
        }

        function updateClock() {
            let timer = getTimeRemaining(),
                idInterval;
            if (timer.hours === 0 && timer.minutes === 0 && timer.seconds === 0) {
                let el = document.querySelectorAll('.timer-numbers');
                el.forEach((item) => {
                    item.style.color = 'red';
                });
            }
            timerHours.textContent = beautyNum(timer.hours);
            timerMinutes.textContent = beautyNum(timer.minutes);
            timerSeconds.textContent = beautyNum(timer.seconds);


            if (count === 0) {
                clearInterval(interval);
                idInterval = setInterval(updateClock, 1000);
            } else {
                clearInterval(idInterval);
            }
            count++;
        }

        function beautyNum(num) {
            let numStr;
            if (num < 10) {
                numStr = '0' + num;
            } else numStr = num;
            return numStr;
        }

        updateClock();

    }

    let interval = setInterval(countTimer, 10, '19 september 2019');
    //меню
    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };
        btnMenu.addEventListener('click', handlerMenu);
        closeBtn.addEventListener('click', handlerMenu);
        menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));

    };
    toggleMenu();
});

//popup
const togglePopup = () => {
    const popup = document.querySelector('.popup'),
        popupBtn = document.querySelectorAll('.popup-btn'),
        popupClose = document.querySelector('.popup-close'),
        popupContent = popup.querySelector('.popup-content');
    let animInterval, animCount = -50, animMaxCount, animParam = '';
    popupBtn.forEach((elem) => {
        elem.addEventListener('click', () => {
            popupContent.style.transform = ``;
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
                popup.style.display = 'block';
            else {
                animParam = 'open';
                animCount = -850;
                popupContent.offsetLeft = -850 + 'px';
                animMaxCount = (0 - popup.clientWidth - popupContent.scrollWidth);
                popup.style.display = 'block';
                startAnimate('open');
            }
        });
    });
    popupClose.addEventListener('click', () => {
        popupContent.style.transform = ``;
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
            popup.style.display = 'none';
        else {
            animMaxCount = (0 - popupContent.offsetLeft - popupContent.scrollWidth - 50);
            animParam = 'close';
            startAnimate('close');
        }
    });

    let startAnimate = function () {
        animInterval = requestAnimationFrame(startAnimate, 'close');
        if (((animCount > animMaxCount) && (animParam === 'close')) || ((animCount < animMaxCount) && (animParam === 'open'))) {
            popupContent.style.transform = `translate(${animCount}px)`;
        } else {
            if (animParam === 'close') popup.style.display = 'none';
            animMaxCount = null;
            animParam = null;
            cancelAnimationFrame(animInterval);
        }
        if (animParam === 'close') animCount = animCount - 50;
        else animCount = animCount + 50;
    };

};

togglePopup();
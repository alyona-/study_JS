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

    let interval = setInterval(countTimer, 10, '19 october 2019');
});

//меню
const toggleMenu = () => {
    const menu = document.querySelector('menu');

    const handlerMenu = (event) => {
        event.stopPropagation();
        let target = event.target;
        if (target.closest('.menu') || target.closest('.close-btn') || target.closest('menu')) {
            menu.classList.toggle('active-menu');
        } else if (target.closest('body')) {
            if (menu.classList.toggle('active-menu')) {
                menu.classList.toggle('active-menu');
            }
            return false;
        }
    };
    document.addEventListener('click', (event) => {
        handlerMenu(event);
    });

};
toggleMenu();
//popup
const togglePopup = () => {
    const popup = document.querySelector('.popup'),
        popupBtn = document.querySelectorAll('.popup-btn'),
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

    let close = () => {
        popupContent.style.transform = ``;
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
            popup.style.display = 'none';
        else {
            animMaxCount = (0 - popupContent.offsetLeft - popupContent.scrollWidth - 50);
            animParam = 'close';
            startAnimate('close');
        }
    };


    popup.addEventListener('click', (event) => {
        let target = event.target;

        if (target.classList.contains('popup-close')) {
            close();
        } else {
            target = target.closest('.popup-content');
            if (!target) {
                close();
            }
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

//табы
const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
        tab = tabHeader.querySelectorAll('.service-header-tab'),
        tabContent = document.querySelectorAll('.service-tab');


    const toggleTabContent = (index) => {
        for (let i = 0; i < tabContent.length; i++) {
            if (index === i) {
                tab[i].classList.add('active');
                tabContent[i].classList.remove('d-none');
            } else {
                tab[i].classList.remove('active');
                tabContent[i].classList.add('d-none');
            }
        }
    };

    tabHeader.addEventListener('click', (event) => {
        let target = event.target;
        target = target.closest('.service-header-tab');

        if (target) {
            tab.forEach((item, i) => {
                if (item === target) {
                    toggleTabContent(i);
                }
            });
        }
    });
};

tabs();

//слайдер
const slider = () => {
    const createDot = () => {
        let slide = document.querySelectorAll('.portfolio-item'),
            portfolioDots = document.querySelector('.portfolio-dots');
        slide.forEach((elem, index) => {
            let dotItem = document.createElement('li');
            (index === 0)
                ? dotItem.classList.add('dot', 'dot-active')
                : dotItem.classList.add('dot');
            portfolioDots.appendChild(dotItem);
        });
    };
    createDot();

    const slide = document.querySelectorAll('.portfolio-item'),
        btn = document.querySelectorAll('.portfolio-btn'),
        dot = document.querySelectorAll('.dot'),
        slider = document.querySelector('.portfolio-content');

    let currentSlide = 0, interval;
    const prevSlide = (elem, index, strClass) => {
        elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass) => {
        elem[index].classList.add(strClass);
    };
    const autoPlaySlide = () => {
        prevSlide(slide, currentSlide, 'portfolio-item-active');
        prevSlide(dot, currentSlide, 'dot-active');
        currentSlide++;
        if (currentSlide >= slide.length) {
            currentSlide = 0;
        }
        nextSlide(slide, currentSlide, 'portfolio-item-active');
        nextSlide(dot, currentSlide, 'dot-active');
    };

    const startSlide = (time = 3000) => {
        interval = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => {
        clearInterval(interval);
    };

    slider.addEventListener('click', (event) => {
        event.preventDefault();
        let target = event.target;

        prevSlide(slide, currentSlide, 'portfolio-item-active');
        prevSlide(dot, currentSlide, 'dot-active');

        if (!target.matches('.portfolio-btn, .dot'))
            return;


        if (target.matches('#arrow-right')) {
            currentSlide++;
        } else if (target.matches('#arrow-left')) {
            currentSlide--;
        } else if (target.matches('.dot')) {
            dot.forEach((elem, index) => {
                if (elem === target) {
                    currentSlide = index;
                }
            });
        }

        if (currentSlide >= slide.length) {
            currentSlide = 0;
        }

        if (currentSlide < 0) {
            currentSlide = slide.length - 1;
        }
        nextSlide(slide, currentSlide, 'portfolio-item-active');
        nextSlide(dot, currentSlide, 'dot-active');
    });

    slider.addEventListener('mouseover', (event) => {
        if (event.target.matches('.portfolio-btn') ||
            event.target.matches('.dot')) {
            stopSlide();
        }
    });

    slider.addEventListener('mouseout', (event) => {
        if (event.target.matches('.portfolio-btn') ||
            event.target.matches('.dot')) {
            startSlide();
        }
    });
    startSlide(1500);

};
slider();


const togglePopup = () => {
    const popup = document.querySelector('.popup'),
        popupBtn = document.querySelectorAll('.popup-btn'),
        popupContent = popup.querySelector('.popup-content');
    let animInterval, animCount = -50, animMaxCount, animParam = '';


    popupBtn.forEach((elem) => {
        elem.addEventListener('click', () => {
            popupContent.style.transform = ``;
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                popup.style.display = 'block';
            } else {
                animParam = 'open';
                animCount = -850;
                animMaxCount = (0 - popup.clientWidth - popupContent.scrollWidth);
                popup.style.display = 'block';
                startAnimate('open');
            }
        });
    });

    let close = () => {
        let form3 = document.getElementById('form3');
        if(form3.lastElementChild.tagName ==='DIV')
            form3.lastChild.textContent ="";
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

export default togglePopup;

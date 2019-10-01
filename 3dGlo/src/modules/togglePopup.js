const togglePopup = () => {
    const popup = document.querySelector('.popup'),
        popupBtn = document.querySelectorAll('.popup-btn'),
        popupContent = popup.querySelector('.popup-content');
    let animInterval, animCount = -50, animMaxCount, animParam = '';


    popupBtn.forEach((elem) => {
        elem.addEventListener('click', () => {
            popupContent.style.transform = ``;
            popup.style.display = 'block';
        });
    });

    let close = () => {
        popupContent.style.transform = ``;
        popup.style.display = 'none';
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

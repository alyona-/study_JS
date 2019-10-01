const imagesStart = () => {
    const cm = document.querySelector('.command');
    const imgMouseOver = (target) => {
        target.dataset.src = target.src;
        target.src = target.dataset.img;
    };
    const imgMouseOut = (target) => {
        target.src = target.dataset.src;
        target.removeAttribute("data-src");
    };
    cm.addEventListener('mouseover', (event) => {
        let target = event.target;
        if (target.matches('.command__photo')) {
            imgMouseOver(target);

        } else return false;
    });

    cm.addEventListener('mouseout', (event) => {
        let target = event.target;
        if (target.matches('.command__photo')) {
            imgMouseOut(target);
        } else return false;
    });

};

export default imagesStart;
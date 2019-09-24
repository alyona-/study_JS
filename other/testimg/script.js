let img = document.querySelector('img');

const imgMouseOver = (event) => {
    let target = event.target;
    target.dataset.src = target.src;
    target.src = target.dataset.img;
};

const imgMouseOut = (event) => {
    let target = event.target;
    target.src =target.dataset.src;
    target.removeAttribute("data-src");
};

img.addEventListener('mouseover',(event) => {imgMouseOver(event)} );
img.addEventListener('mouseout',(event) => {imgMouseOut(event)} );
console.clear();
const height = document.documentElement.clientHeight;
console.log('height: ', height);

const width = document.documentElement.clientWidth;
console.log('width: ', width);

let scrollTop = document.documentElement.scrollTop;
scrollTop =0;

//Размеры вместе с полосой прокрутки
let offsetHeight = document.documentElement.offsetHeight,
    offsetWidth = document.documentElement.offsetWidth;

console.log('offsetHeight: ', offsetHeight);
console.log('offsetWidth: ', offsetWidth);

let btnHeight = document.querySelector('.btn-height'),
    block =document.querySelector('block');

btnHeight.addEventListener('click', (e)=>{
    block.style.height =`${block.scrollHeight}px`;
    block.style.width =`${block.scrollWidth}px`;
});
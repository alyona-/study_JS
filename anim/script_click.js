//по клику
let one = document.querySelector('.one'),
    two = document.querySelector('.two'),
    count= 0;

let flyInterval;

let flyAnimate = function() {
    flyInteval =requestAnimationFrame(flyAnimate);
    count++;
    if(count<350) {
        one.style.top = count+'px';
        two.style.left = count *2 +'px';
    }else if(count < 500) {
        two.style.left = count *2 +'px';
    }else {
        cancelAnimationFrame(flyInterval);
    }
};

let animate = false;
document.addEventListener('click', function() {
    if(animate){
        flyInterval = requestAnimationFrame(flyAnimate);
        animate =false;
    }else {
        animate=true;
        cancelAnimationFrame(flyInterval);
    }
});


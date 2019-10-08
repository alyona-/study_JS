const modalPresent = () => {
    let fixedGift, modalGift;
    if(document.querySelector('.fixed-gift')) {
        fixedGift =document.querySelector('.fixed-gift');
        modalGift = document.querySelector('#gift');
    }else {
        return false;
    }

    const handlerPresent =(event) => {
        event.stopPropagation();
        let target = event.target;
        if(target.closest('.fixed-gift')){
            modalGift.style.display = "block";
            fixedGift.style.display = "none";
        }else if(target.closest('.close_icon') || target.closest('.close-btn') || !target.closest('.form-content') ) {
            modalGift.style.display = "none";
            fixedGift.style.display = "block";
        }
        return false;
    };

   document.addEventListener('click', (event) => {
        handlerPresent(event);
   });

};

export default modalPresent;
//modalPresent();
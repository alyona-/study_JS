const handlingInput = () => {
    document.addEventListener('input', (e) => {
        e.preventDefault();
       let target =e.target;
       if(target.getAttribute("placeholder") ==="Ваше имя..."){
            target.value = target.value.replace(/[^А-Яа-я\s]/gi, '');
       }else if(target.getAttribute("placeholder") ==="Ваш номер телефона..."){
           target.value = target.value.replace(/[^0-9(\\+)]/g, '');
       }
       return false;
    });

};


export default handlingInput;
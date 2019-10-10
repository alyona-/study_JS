const sendModal = () => {
    const errorMessage = 'Что-то пошло не так...',
        loadMessage = 'Загрузка...',
        successMessage = 'Спасибо!  Мы скоро с вами свяжемся!',
        statusMessage = document.createElement('div'),
        cssForm1 = 'font-size: 2rem; color:#fff; text-align: center; ',
        cssForm2 ='font-size: 2rem; color:#fff; text-align: center; position: absolute; top:35%;';
 //   statusMessage.style.cssText = 'font-size: 2rem; color:#fff; text-align: center; position: absolute; top:35%;';


    const cleanForms = (target)=> {

            if(target.closest("#footer_form") ) {
                thanks(target);
            } else if(target.closest("#banner_form")){
                while (target.children.length > 0) {
                    target.removeChild(target.lastChild);
                }
            }else{
                while (target.children.length > 1) {
                    target.removeChild(target.lastChild);
                }
            }
         //   target.reset();

    };

    const getStyleForm = (target) => {
        if((target.closest("#form1") || (target.closest("#form2"))))
            statusMessage.style.cssText = cssForm2;
        else statusMessage.style.cssText = cssForm1;
    };

    const getStyleLoadForm = (target) => {
       statusMessage.style.cssText = cssForm1;
    };

    const postData = (target) => {
        getStyleLoadForm(target);
        statusMessage.textContent = loadMessage;
         target.appendChild(statusMessage);

        return fetch('./server.php', {
            method: 'POST'
            , body: new FormData(target)
        })
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('status network not 200');
                }
                getStyleForm(target);
                statusMessage.textContent = successMessage;
                target.dataset.send =true;
                cleanForms(target);
                alert(target);
                if(!target.closest('#footer_form')) {
                    target.appendChild(statusMessage);
                    alert("не футер добавить");
                }else{
                    target.removeChild(target.lastElementChild);
                    alert("футер удалить");
                }


            })
           .catch(() => {
               getStyleForm(target);
               statusMessage.textContent = errorMessage;
               cleanForms(target);
               target.appendChild(statusMessage);

            })
    };

    const doForm = (event) => {
        return new Promise((resolve, reject) => {
            let target = event.target;
            if (target.closest('#form1') || target.closest('#form2') || target.closest('#footer_form') || target.closest('#banner-form')) {
                resolve(event);
            } else {
                reject();
            }
        });
    };

    const formSubmit = (event) => {
        event.preventDefault();
        let target = event.target;



        postData(target);

      /*  if(target.hasAttribute("data-send")) {
            if(target.closest("#footer_form") ) {
                thanks(target);
            } else{
                while (target.children.length > 1) {
                    target.removeChild(target.lastChild);
                }
            }

        } */
        target.reset();

    };

    const thanks =(target) =>{
        document.querySelector("#thanks").style.display="block";
        target.dataset.send =true;
    };



    document.addEventListener('submit', (event) => {
        doForm(event)
            .then(formSubmit)
            .catch(() => {
                return false;
            })
    });



};

sendModal();
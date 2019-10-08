const sendModal = () => {
    const errorMessage = 'Что-то пошло не так...',
        loadMessage = 'Загрузка...',
        successMessage = 'Спасибо! \n Мы скоро с вами свяжемся!',
        statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'font-size: 2rem; color:#fff; text-align: center;';
    let tmpForm;


    const postData = (formData) => {
        return fetch('./server.php', {
            method: 'POST'
            , body: formData
        })
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('status network not 200');
                }
                statusMessage.textContent = successMessage;
            }).catch(() => {
                statusMessage.textContent = errorMessage
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

        const formData = new FormData(target);
        postData(formData);
        target.reset();
        let parent = target.parentNode;
        let tmpForm = target;


        if(target.closest("#footer_form") ) {
            // while (target.children.length > 0) {
            //     target.removeChild(target.lastChild);
            // }
            thanks(target);
        } else{
            while (target.children.length > 1) {
                target.removeChild(target.lastChild);
            }
            target.appendChild(statusMessage);
            target.dataset.send =true;
        }



    };

    const thanks =(target) =>{
        document.querySelector("#thanks").style.display="block";
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
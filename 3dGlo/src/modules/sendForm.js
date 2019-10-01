const sendForm = () => {
    const errorMessage = 'Что-то пошло не так...',
        loadMessage = 'Загрузка...',
        successMessage = 'Спасибо! Мы скоро с вами свяжемся!',
        statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'font-size: 2rem; color:#fff;';

    const formValid = (event) => {
        event.stopPropagation();
        let target = event.target;
        if (target.closest('#form1') || target.closest('#form2') || target.closest('#form3')) {
            if (target.matches('input.form-name') || target.matches('input#form2-name') || target.matches('input#form2-message'))
                target.value = target.value.replace(/[^А-Яа-я\s]/gi, '');
            else if (target.matches('input.form-phone'))
                target.value = target.value.replace(/[^0-9(\\+)]/g, '');
        }
        return false;
    };

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
            if (target.closest('#form1') || target.closest('#form2') || target.closest('#form3')) {
                resolve(event);
            } else {
                reject();
            }
        });
    };

    const formSubmit = (event) => {
        event.preventDefault();
        let target = event.target;
        target.appendChild(statusMessage);
        const formData = new FormData(target);
        postData(formData);
        target.reset();
    };

    document.addEventListener('input', (event) => {
        formValid(event);
    });

    document.addEventListener('submit', (event) => {
        doForm(event)
            .then(formSubmit)
            .catch(() => {
                return false;
            })
    });
};

export default sendForm;
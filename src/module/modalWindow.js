const modalWindow = () => {
    const freeVisit =document.querySelector(".free-visit a"),
        visitForm =document.getElementById("free_visit_form");

    const btnCall = document.querySelector('.head-main .callback-btn'),
        callForm =document.getElementById("callback_form");

    let tmpModalForm;


    document.addEventListener('click', (event) => {
        event.stopPropagation();

        let t = event.target;
        let targetPopup =t.closest('.popup');
        let formTest;
        if(targetPopup) {
            formTest = targetPopup.querySelector("form");
        }


        let target = event.target;

        if(target.closest('.callback-btn') && !target.closest("#footer_form")){
            callForm.style.display = "block";
            tmpModalForm =document.querySelector("#form1").cloneNode(true);
        } else  if(target.closest('.callback-btn') && target.closest("#footer_form")){
        }else if(target.closest('.free-visit')){
            visitForm.style.display = "block";
            tmpModalForm =document.querySelector("#form2").cloneNode(true);
        }else if(target.closest('.close_icon') || !target.closest('.form-content')  || target.closest('.close-btn')) { //|| target.closest('.btn-send')
            let targetForm = target.closest('.popup');
            if(target.closest('#callback_form') || target.closest("#free_visit_form") ) {
                targetForm.style.display = 'none';
                clearForm(targetForm);
            }else if( target.closest("#thanks")) {
                targetForm.style.display = 'none';
                document.querySelector('#footer_form').removeAttribute("data-send");

            }
        }

        return false;
    });


    const clearForm = (parent) =>{
        let form1 =parent.querySelector("form");
        let p =form1.parentNode;
        tmpModalForm.reset();
        if(form1.hasAttribute("data-send")) {
            form1.removeAttribute("data-send");
            p.replaceChild(tmpModalForm,form1);
        }
        return false;
    };

};

modalWindow();
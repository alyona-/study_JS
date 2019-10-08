const modalWindow = () => {
    const freeVisit =document.querySelector(".free-visit a"),
        visitForm =document.getElementById("free_visit_form");

    const btnCall = document.querySelector('.head-main .callback-btn'),
        callForm =document.getElementById("callback_form");

    let tmpModalForm;


    document.addEventListener('click', (event) => {
        event.stopPropagation();
        let target = event.target;
        if(target.closest('.callback-btn') && !target.closest("#footer_form")){
            callForm.style.display = "block";
            tmpModalForm =document.querySelector("#form1").cloneNode(true);
        } else  if(target.closest('.callback-btn') && target.closest("#footer_form")){
           // tmpModalForm =document.querySelector("#form1").cloneNode(true);
        }else if(target.closest('.free-visit')){
            visitForm.style.display = "block";
            tmpModalForm =document.querySelector("#form2").cloneNode(true);
        }else if(target.closest('.close_icon') || !target.closest('.form-content') ) { //|| target.closest('.btn-send')

            if(target.closest("#callback_form")){
                callForm.style.display = "none";
                clearForm(target.closest("#callback_form"));
            }else if(target.closest("#free_visit_form")){
                visitForm.style.display = "none";
                clearForm(target.closest("#free_visit_form"));
            }

        }
        return false;
    });


    const clearForm = (parent) =>{
        let form =parent.querySelector("form");
        if(form.hasAttribute("data-send")) {
            form.removeAttribute("data-send");
            form.innerHTML= tmpModalForm.innerHTML;
        }
        return false;
    };



};

modalWindow();
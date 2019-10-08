const modalWindow2 = () => {
    const btnCall = document.querySelector('.head-main .callback-btn'),
        callForm =document.getElementById("callback_form");

    document.addEventListener('click', (event) => {
        event.stopPropagation();
        let target = event.target;
        if(target.closest('.callback-btn')){
            callForm.style.display = "block";
        } else if(target.closest('.close_icon') || !target.closest('.form-content') ) { //|| target.closest('.btn-send')
            //visitForm.style.display = "none";

           // let parent =target.closest("#callback_form");
            if(target.closest("#callback_form")){
              //  alert("callback");
                callForm.style.display = "none";
            }else if(target.closest("#free_visit_form")){
               // alert("не callback");
            }
         //   alert(parent);
         //   let test = parent.querySelector("form");
            // alert(test.id);



        }
        return false;
    });

};

modalWindow2();
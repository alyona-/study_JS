const modalWindow1 = () =>{
    const freeVisit =document.querySelector(".free-visit a"),
    visitForm =document.getElementById("free_visit_form");
    let tmpForm;

   document.addEventListener('click', (event) => {
       event.stopPropagation();
       let target = event.target;
       if(target.closest('.free-visit')){
           visitForm.style.display = "block";
       }else if(target.closest('.close_icon')  || !target.closest('.form-content') ) { //|| target.closest('.btn-send')
           visitForm.style.display = "none";
       }
       return false;
   });
};

modalWindow1();
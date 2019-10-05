document.querySelector('.content').addEventListener('click', (event) => {
    event.preventDefault();
    let target = event.target;
   // alert(target.type);
    if(target.type ==="submit") {
      //  alert("кнопка submit");
        console.clear();


        let target2 = target.closest("form");
        if(target.closest("form")) {


         /*   target2.addEventListener('submit', (e) => {
                e.preventDefault();
                console.log(e.action);
            });

            var submitEvent = new Event('submit'); //создаем событие
            target2.dispatchEvent(submitEvent); //имитируем клик на кнопку */

           // console.log(target2.action);
            console.log(target2.getAttribute("action"));

        }else {
            console.log("submit не принадлежит ни одной форме");
        }


    }else {
       alert(event.target);
    }

});

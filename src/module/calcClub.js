const calcClub = () =>{
  let priceTotal;
  if(!document.getElementById("price-total")){
      return false;
  }else {
      priceTotal = document.getElementById("price-total");
      priceTotal.dataset.total = priceTotal.textContent;
      priceTotal.dataset.month =1;
  }
  if(document.querySelector(".time")) {
      document.querySelector(".time").addEventListener('input', (e) => {
          priceTotal.setAttribute("data-month", e.target.value);
          startCalc();
      });
  }
    const startCalc = () => {
      if(priceTotal.hasAttribute("data-promo")) {
          let tmp = priceTotal.getAttribute("data-total") * priceTotal.getAttribute("data-month");
          priceTotal.textContent = ( parseInt(tmp) - parseInt(tmp/100*30 )) ;
        }else {
          priceTotal.textContent = priceTotal.getAttribute("data-total") * priceTotal.getAttribute("data-month");
        }

    };

    document.addEventListener('input', (e) => {
        e.preventDefault();
        let target =e.target;
        if(target.getAttribute("placeholder") ==="Промокод") {
            if(target.value ==="ТЕЛО2019") priceTotal.dataset.promo =true;
            else  priceTotal.removeAttribute("data-promo");
            startCalc();
        }
        return false;
    });

};

export default calcClub;
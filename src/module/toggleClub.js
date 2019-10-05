const toggleClub = () => {
    let clubSelect = document.querySelector('.club-select'),
        clubList = document.querySelector('.clubs-list ul');

    const closeSelect= ()=> {
        clubList.style.display ='none';
        clubSelect.removeAttribute("data-st");
        clubList.classList.remove("club-active");
    };

    const openSelect = () =>{
        clubSelect.dataset.st = "active";
        clubList.style.display ='block';
        clubList.classList.add("club-active");
    };

    const clubHandler = (e) => {
        e.stopPropagation();
        let target =e.target;
        if(target.hasAttribute('data-st')){
            closeSelect();
        }else if(target.closest(".clubs-list") && !clubSelect.hasAttribute('data-st')) {
            openSelect();
        }else if(clubSelect.hasAttribute('data-st') && !target.closest(".club-active")){
            closeSelect();
        }
        return false;
    };

    document.addEventListener('click', (e) => {
        clubHandler(e);
    });

};

export default toggleClub;

//toggleClub();
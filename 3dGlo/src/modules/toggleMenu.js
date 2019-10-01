const toggleMenu = () => {
    const menu = document.querySelector('menu');

    const handlerMenu = (event) => {
        event.stopPropagation();
        let target = event.target;
        if (target.closest('.menu') || target.closest('.close-btn')  /*|| target.closest('menu') */
        || target.matches('menu li') || target.matches('menu a')
        ) {
            menu.classList.toggle('active-menu');
        } else if (target.closest('body') && !menu.classList.contains('active-menu')) {
            if (menu.classList.toggle('active-menu')) {
                menu.classList.toggle('active-menu');
            }
            return false;
        }
        return false;
    };
    document.addEventListener('click', (event) => {
        handlerMenu(event);
    });

};

export default toggleMenu;
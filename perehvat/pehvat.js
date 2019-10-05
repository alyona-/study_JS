let servlet = document.querySelector('.servlet');

servlet.addEventListener('submit', (event) => {
    event.stopPropagation();
    event.preventDefault();
    console.log(event);

    console.dir(event);
});
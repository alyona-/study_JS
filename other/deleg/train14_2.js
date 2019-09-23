let buttons = document.querySelectorAll('.button');
const content = document.querySelector('.content'),
    wrapButtons = document.querySelector('.wrapper-button'),
    addButton = document.querySelector('.add-button');

const changeText = (event) => {
    content.textContent = event.target.textContent;
};

const getButton = () =>{
    const newButton = buttons[0].cloneNode();
    let textButton = buttons.length + 1;
    if (textButton < 10) {
        textButton = `0${textButton}`;
    }
    newButton.textContent = textButton;
    newButton.addEventListener('click', changeText);
    wrapButtons.appendChild(newButton);
    buttons = document.querySelectorAll('.button');

};

addButton.addEventListener('click', getButton);
wrapButtons.addEventListener('click',() => {
    //Исключаем все кроме класса buttons
    if(!event.target.classList.matches('.button')) {
        return;
    }
    changeText(event);
});


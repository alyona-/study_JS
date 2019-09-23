let buttons = document.querySelectorAll('.button');
const content = document.querySelector('.content'),
    wrapButtons = document.querySelector('.wrapper-button'),
    addButton = document.querySelector('.add-button');

const changeText = (event) => {
    content.textContent = event.target.textContent;
};

// buttons.forEach((elem) => {
//     elem.addEventListener('click', changeText);
// });

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


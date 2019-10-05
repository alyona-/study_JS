let content = document.querySelector('.content'),
    div =document.querySelectorAll('.test1');

div.forEach((item) => {
   console.log('item = '+ item.textContent);
});
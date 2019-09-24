const header = document.querySelector('h1'),
    link = document.getElementById('googl'),
    img = document.querySelector('img');


img.addEventListener('mouseenter', (event) => {
    event.target.src = event.target.dataset.img;
});

// console.log(heder.style);
// console.log(link.style);
// console.log(img.style);

//
// console.log(img.hasAttribute('alts'));
// console.log(img.getAttribute('alt'));
// console.log(img.setAttribute('alt', 'logotype'));
// console.log(img.getAttribute('alt'));
// console.log(img.removeAttribute('alt'));
//
//
// console.log(img.className);
//
// img.className = 'newimg';
// console.log(img.className);
//
// img.className = 'newimg2 newimg3';
// console.log(img.className);
//
// console.dir(img.classList);
//
// console.log(img.classList.contains('newimg2'));
//
// img.classList.add('pic');
// img.classList.remove('pic');
// img.classList.toggle('pic');
//
// header.dataset.aboutHeader = 'заголовок';
// console.log(img.dataset.img);

let appData = {
    collectToArray: function (collect) {
        let arr = [];
        for (let i = collect.length >>> 0; i--;) {
            arr[i] = collect[i];
        }
        return arr;
    },

    sortMainDiv: function () {
        let array = [],
            output = "";
        array = appData.collectToArray(elems);

        array.sort(function (a, b) {
            return Number(a.firstElementChild.firstElementChild.textContent.match(/\d/)[0])
                - Number(b.firstElementChild.firstElementChild.textContent.match(/\d/)[0]);
        });

// join the array back into HTML
        for (let i = 0; i < array.length; i++) {
            if (i === 1 || i === 4) {
                output += appData.sortList(array[i]).outerHTML;
            } else if (i === 2) {
                array[i].firstElementChild.firstElementChild.textContent = array[i].firstElementChild.firstElementChild.textContent.replace('Пропопипы', 'Прототипы');
                output += array[i].outerHTML;
            } else if (i === 5) {
                let element = document.createElement('li');
                element.textContent = "Глава 8: За пределами ES6";
                array[i].querySelectorAll('ul')[0].appendChild(element);
                output += appData.sortList(array[i]).outerHTML;
            } else {
                output += array[i].outerHTML;
            }
        }
        return output;
    },
    sortList: function (elems) {
        let ul = elems.querySelectorAll('ul'),
            li = elems.querySelectorAll('li'),
            liArr = appData.collectToArray(li),
            liIntro = liArr.filter(item => item.textContent.indexOf('Введение') !== -1),
            liForeword = liArr.filter(item => item.textContent.indexOf('Предисловие') !== -1),
            liChapt = liArr.filter(item => item.textContent.indexOf('Глава') !== -1),
            liApp = liArr.filter(item => item.textContent.indexOf('Приложение') !== -1);

        liChapt.sort(function (a, b) {
            return Number(a.textContent.match(/\d/)[0])
                - Number(b.textContent.match(/\d/)[0]);
        });

        liApp.sort(function (a, b) {
            return Number(a.textContent.match(/[A-Za-z]/)[0].charCodeAt(0))
                - Number(b.textContent.match(/[A-Za-z]/)[0].charCodeAt(0));
        });

        for (let i = 0; i < li.length; i++) {
            ul[0].removeChild(li[i]);
        }

        for (let i = 0; i < liChapt.length; i++) {
            ul[0].appendChild(liChapt[i]);
        }

        for (let i = 0; i < liIntro.length; i++) {
            ul[0].appendChild(liIntro[i]);
        }

        for (let i = liIntro.length, j = 0; i < liForeword.length + liIntro.length; i++, j++) {
            ul[0].appendChild(liForeword[j]);
        }
        for (let i = liIntro.length + liForeword.length, j = 0; i < liChapt.length + liIntro.length + liForeword.length; i++, j++) {
            ul[0].appendChild(liChapt[j]);
        }
        for (let i = liIntro.length + liForeword.length + liChapt.length, j = 0; i < liApp.length + liIntro.length + liForeword.length + liChapt.length; i++, j++) {
            ul[0].appendChild(liApp[j]);
        }
        return elems;
    }
};

let elems = document.querySelectorAll(".book"),
    body = document.querySelector('body'),
    adv = document.querySelectorAll('.adv');
body.style.background = 'url(./image/you-dont-know-js.jpg) repeat ';
document.querySelector('.books').innerHTML = appData.sortMainDiv(elems);
body.removeChild(adv[0]);
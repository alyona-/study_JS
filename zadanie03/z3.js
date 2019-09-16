const cityArr = {
    rus: ['Москва', 'Санк-Петербург', 'Новосибирск', 'Екатеринбург', 'Нижний Новгород', 'Казань', 'Челябинск'],
    uk: ['Киев', 'Харьков', 'Одесса', 'Днепр', 'Донецк', 'Запорожье', 'Львов'],
    bel: ['Минск', 'Гомель', 'Могилёв', 'Витебск', 'Гродно', 'Брест'],
    jap: ['Токио', 'Киото', 'Осака', 'Иокогама']
};

let country =document.querySelector('#country'),
    city=document.querySelector('#city');

country.addEventListener('change', function (e) {
    for(let i=0; i<cityArr[e.target.value].length;i++){
        let option = document.createElement ("option");
        option.text = cityArr[e.target.value][i];
        option.value = cityArr[e.target.value][i];
        city.options.add(option);
    }
    city.style.display = 'inline-block';
});
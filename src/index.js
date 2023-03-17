import './css/styles.css';
import fetchCountries from "./fetchCountries";
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 500;

const debounce = require('lodash.debounce');

const refs = {
    searchBox: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
}

// Додаємо прослуховувач події при вводі тексту
refs.searchBox.addEventListener('input', debounce(onSearchBoxChange, DEBOUNCE_DELAY));

// Функція обробки результату пошуку 
function onSearchBoxChange(e) {
    // Назва країни з поля пошуку
    const nameSearch = e.target.value.trim();

    // Очищуємо список країн
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';

    // Якщо якщо поле для пошуку порожнє
    if (!nameSearch) {
        return false;
    }

    fetchCountries(nameSearch).then(response => {
        // Кількість країн у результаті пошуку
        const numCountries = response.length;

        if (numCountries === 0) {
            Notiflix.Notify.failure("Oops, there is no country with that name");
        } else if (numCountries > 10) {
            Notiflix.Notify.warning("Too many matches found. Please enter a more specific name.");
        } else if (numCountries >= 2 && numCountries <= 10) {
            // Виводимо інформацію про декілька країн
            refs.countryList.innerHTML = getCountryListCard(response);
        } else if (numCountries === 1) {
            // Виводимо інформацію про країну
            refs.countryInfo.innerHTML = getCountryCard(response[0]);
        }
    }).catch(error => {
        console.log(error);
    });
}

// Функція формування виводу про декілька країн
function getCountryListCard(response) {
    return response.map(({ flags: { svg: flagSvg }, name: { official: officialName} }) => {
        return `
            <li class="item">
            <img class="flag" src="${flagSvg}" height="30" alt="Flag ${officialName}">
                ${officialName}
            </li>
        `;
    }).join(''); 
}
     
            
// Функція формування виводу інформації про країну
function getCountryCard({ name:{ official: officialName }, flags: { svg: flagSvg }, capital, population, languages }) {
     return `
        <h1 class="title">
        <img class="flag" src="${flagSvg}" height="40" alt="flag">${officialName}</h1>
        <ul class="list">
            <li class="item"><span class="label">Capital:</span> ${capital}</li>
            <li class="item"><span class="label">Population:</span> ${population}</li>
            <li class="item"><span class="label">Languages:</span> ${Object.values(languages).join(', ')}</li>
        </ul>
    `;
}
import Notiflix from 'notiflix';

// Функція повертає проміс з масивом країн - результатом пошуку
export default function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`).then(response => {
        if (!response.ok) {
            if (response.status === 404) { 
                return [];
            }
            throw new Error(response.status);
        }
    
        return response.json();
    }).catch(error => {
        console.log(error);
    });
}
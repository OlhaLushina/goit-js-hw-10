import Notiflix from 'notiflix';

// Функція повертає проміс з масивом країн - результатом пошуку
export default function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`).then(response => {
        console.log(response);
        if (!response.ok) {
            const errorText = (response.status === 404) ? "Oops, there is no country with that name" : response.status;
            throw new Error(errorText);
        }
        return response.json();
    }).catch(error => {
        Notiflix.Notify.failure(error.toString());
    });
}
const debounce = require('lodash.debounce');
import Notiflix from 'notiflix';

import refs from '../js/refs.js';

const { input, list, info } = refs;
const maxCountriesLength = 10;
const DEBOUNCE_DELAY = 300;

input.addEventListener('input', debounce(onFetchCountries, DEBOUNCE_DELAY));

function onFetchCountries(evt) {
  if (evt.target.value.trim() === '') {
    console.log(evt.target.value.trim());
    return;
  }
  list.innerHTML = '';
  info.innerHTML = '';

  fetch(
    `https://restcountries.eu/rest/v2/name/${evt.target.value.trim()}?fields=name;capital;population;flag;languages`,
  )
    .then(response => {
      if (response.status === 404) {
        throw new Error();
      } else {
        return response.json();
      }
    })
    .then(countries => {
      if (countries.length > maxCountriesLength) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
      } else {
        generateCountriesList(countries);
      }
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

function generateCountriesList(countries) {
  const fechedCountries = countries
    .map(country => {
      return `<li class="menu-item"><img class="country-flag" src=${country.flag} alt=${country.name}><p class="country-name">${country.name}</p></li>`;
    })
    .join('');

  if (countries.length === 1) {
    const countryLanguages = countries[0].languages
      .map(language => {
        return language.name;
      })
      .join(', ');

    const countriesInfo = countries
      .flatMap(country => {
        return `<p> Capital: <span class='info-item'>${country.capital}</span></p>
        <p> Population: <span class='info-item'>${country.population}</span></p>
        <p> Languages: <span class='info-item'>${countryLanguages}</span></p>`;
      })
      .join('');

    list.innerHTML = fechedCountries;
    info.innerHTML = countriesInfo;
  } else {
    list.innerHTML = fechedCountries;
  }
}

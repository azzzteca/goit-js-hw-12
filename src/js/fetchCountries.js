import refs from './refs.js';
const debounce = require('lodash.debounce');
import Notiflix from 'notiflix';

const { input, list, countryInfo } = refs;
const maxCountryLengthToShow = 10;

input.addEventListener('input', debounce(onFetchCountry, 300));

function onFetchCountry(evt) {
  //   evt.preventDefault();

  if (evt.data === null) {
    console.log('ничего не делаю');
    return;
  }

  // console.log(evt.data);

  fetch(
    `https://restcountries.eu/rest/v2/name/${evt.target.value}?fields=name;capital;population;flag;languages`,
  )
    .then(response => {
      if (response.status === 404) {
        throw new Error();
      }

      return response.json();
    })
    .then(countries => {
      console.log(countries);
      if (countries.length > maxCountryLengthToShow) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name');
      }
    })
    .catch(() => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

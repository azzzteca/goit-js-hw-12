import refs from './refs.js';
import Swal from 'sweetalert2';

const { input, list, countryInfo } = refs;
const maxCountryLengthToShow = 5;

input.addEventListener('input', onFetchCountry);

function onFetchCountry(evt) {
  //   evt.preventDefault();

  if (evt.data === null) {
    console.log('ничего не делаю');
    return;
  }

  console.log(evt.data);

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
      if (countries.length >= maxCountryLengthToShow) {
        Swal.fire({
          //   position: 'top-center',
          icon: 'warning',
          // icon: 'success',
          title: 'To many matches found. Please enter a more specific name',
          showConfirmButton: false,
        });
      }
    })
    .catch(() => {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        // icon: 'success',
        title: 'Oops, there is no country whith that name',
        showConfirmButton: false,
        timer: 3500,
      });
    });
}

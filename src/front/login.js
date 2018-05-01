import axios from 'axios';
import state from './store';
import { url } from './helpers';

const $form = document.querySelector('#loginForm');
const $lights = document.querySelector('#lights');

function login(password) {
  const data = {
    password,
  };

  axios.post(`${url}/login`, data)
    .then(() => {
      console.log('successfully logged in');
      state.set('password', password);
      $form.classList.add('hidden');
      $lights.classList.remove('hidden');
    });
}

$form.addEventListener('submit', (event) => {
  event.preventDefault();

  const password = $form.elements['password'].value;

  login(password);
});

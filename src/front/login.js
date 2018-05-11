import axios from 'axios';
import { url } from './helpers';
import lights from './lights';

const $form = document.querySelector('#loginForm');
const $voice = document.querySelector('#voice');

function displayLoggedIn() {
  $form.classList.add('hidden');
  $voice.classList.remove('hidden');
  lights.displayAll();
}

function login(password) {
  axios.post(`${url}/login`, {password})
    .then(displayLoggedIn)
    .catch(() => {
      console.log('wrong credentials');
    });
}

// check if already logged in
axios.get(`${url}/login`)
  .then(displayLoggedIn)
  .catch(() => {
    console.log('You are not logged in yet');
  });

$form.addEventListener('submit', (event) => {
  event.preventDefault();

  const password = $form.elements['password'].value;

  login(password);
});

import axios from 'axios';
import { url } from './helpers';
import lights from './lights';

const $form = document.querySelector('#loginForm');

function login(password) {
  const data = {
    password,
  };

  axios.post(`${url}/login`, data)
    .then(() => {
      $form.classList.add('hidden');
      lights.displayAll();
    });
}

axios.get(`${url}/login`)
  .then(() => {
    $form.classList.add('hidden');
    lights.displayAll();
  });

$form.addEventListener('submit', (event) => {
  event.preventDefault();

  const password = $form.elements['password'].value;

  login(password);
});

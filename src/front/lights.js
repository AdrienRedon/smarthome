import axios from 'axios';
import { url } from './helpers';

const $lights = document.querySelector('#lights');
let lights;

function displayAll() {
  $lights.innerHTML = '';

  axios.get(`${url}/lights`)
    .then((response) => {
      lights = response.data;

      Object.keys(lights).forEach((key) => {
        const light = lights[key];
        const turnOn = `<button class="btn-on" data-id="${key}">Turn on</button>`;
        const turnOff = `<button class="btn-off" data-id="${key}">Turn off</button>`;

        $lights.insertAdjacentHTML('beforeend', `<li>${light.name} : ${light.state.on ? turnOff : turnOn}</li>`);
      });

      document.querySelectorAll('.btn-on').forEach(btn => {
        btn.addEventListener('click', (el) => {
          turnOn(el.target.dataset.id);
        });
      });

      document.querySelectorAll('.btn-off').forEach(btn => {
        btn.addEventListener('click', (el) => {
          turnOff(el.target.dataset.id);
        });
      });
    });
}

function turnOn(id) {
  return axios.put(`${url}/lights/${id || ''}`)
    .then(displayAll);
}

function turnOff(id) {
  return axios.delete(`${url}/lights/${id || ''}`)
    .then(displayAll);
}

function getIdByName(name) {
  return Object.keys(lights).find((key) => lights[key].name.toUpperCase() === name.toUpperCase());
}

export default {
  displayAll,
  turnOn,
  turnOff,
  getIdByName,
};

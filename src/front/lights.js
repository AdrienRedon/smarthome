import axios from 'axios';
import { url } from './helpers';

const $lights = document.querySelector('#lights');

function displayAll() {
  $lights.innerHTML = '';

  axios.get(`${url}/lights`)
    .then((response) => {
      const lights = response.data;

      Object.keys(lights).forEach((key) => {
        const light = lights[key];
        const turnOn = `<button class="btn-on" data-id="${key}">Turn on</button>`;
        const turnOff = `<button class="btn-off" data-id="${key}">Turn off</button>`;

        $lights.insertAdjacentHTML('beforeend', `<li>${light.name} : ${light.state.on ? turnOff : turnOn}</li>`);
      });

      document.querySelectorAll('.btn-on').forEach(btn => {
        btn.addEventListener('click', (el) => {
          turnOn(el.target.dataset.id)
            .then(() => displayAll());
        });
      });

      document.querySelectorAll('.btn-off').forEach(btn => {
        btn.addEventListener('click', (el) => {
          turnOff(el.target.dataset.id)
            .then(() => displayAll());
        });
      });
    });
}

function turnOn(id) {
  return axios.put(`${url}/lights/${id}`);
}

function turnOff(id) {
  return axios.delete(`${url}/lights/${id}`);
}

export default {
  displayAll,
};

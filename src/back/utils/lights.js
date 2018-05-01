const axios = require('axios');

module.exports = {
  color: [
    {'rouge': {on: true, sat: 254, hue: 0}},
    {'bleue': {on: true, sat: 254, hue: 46920}},
    {'bleu': {on: true, sat: 254, hue: 46920}},
    {'blanc': {on: true, sat: 254, hue: 10000}},
    {'aléatoire': {on: true, sat: 122, effect: "colorloop"}},
  ],
  apiLights: `http://${process.env.IPHUE}/api/${process.env.USERHUE}/lights`,

  turnOn (lightId, color) {
    const data = this.color.find(key => key === color) || {on: true};

    axios.put(`${this.apiLights}/${lightId}/state`, data);
  },
  turnOff (lightId) {
    axios.put(`${this.apiLights}/${lightId}/state`, {on: false});
  },
  getState () {
    return axios.get(this.apiLights).then(response => response.data);
  },
};

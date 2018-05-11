import { ApiAiClient } from 'api-ai-javascript/ApiAiClient';
import lights from './lights';

const client = new ApiAiClient({accessToken: process.env.DIALOGFLOWTOKEN});

const $voice = document.querySelector('#voice');
const $mic = document.querySelector('#mic');

window.SpeechRecognition = window.SpeechRecognition ||
  window.webkitSpeechRecognition  ||
  null;
let isListening = false;
let recognizer, transcription;

if (window.SpeechRecognition === null) {
  console.log('Speech recognition not supported');
  $voice.innerHTML = '';
} else {
  $mic.addEventListener('click', listen);

  recognizer = new window.SpeechRecognition();
  recognizer.lang = process.env.LANGUAGE;

  // Recogniser doesn't stop listening even if the user pauses
  recognizer.continuous = true;
  // interim results
  recognizer.interimResults = false;

  recognizer.onresult = (event) => {
    transcription = '';
    for (let result of event.results) {
      if(result.isFinal) {
        transcription = result[0].transcript;
        sendAction(result[0].transcript);
      } else {
        transcription += result[0].transcript;
      }
    }
  };
}

function listen() {
  if (isListening) {
    stop();
    $mic.classList.remove('active');
  } else {
    play();
    $mic.classList.add('active');
  }
  isListening = !isListening;
}

function play() {
  try{
    recognizer.start();
    console.log('Recognition started');
  } catch(e) {
    console.log(e.message);
  }
}

function stop() {
  recognizer.stop();
  console.log('Recognition stopped');
}

function sendAction(text) {
  client.textRequest(text)
    .then(resp => handleResponse(resp))
    .catch(err => console.error(err));
}

function handleResponse(res) {
  if (res.result.action === 'turnOn') {
    lights.turnOn(lights.getIdByName(res.result.parameters.rooms));
  } else if (res.result.action === 'turnOff') {
    lights.turnOff(lights.getIdByName(res.result.parameters.rooms));
  }
}

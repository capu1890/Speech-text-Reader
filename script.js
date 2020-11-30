const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

const data = [
  {
    image: './img/airforceones.jpg',
    text: "Air Force ones"
  },
  {
    image: './img/sherpajacket.jpg',
    text: "Sherpa Trucker Jacket"
  },
  {
    image: './img/adidas-Grey-Yeezy-Boost-350-V2.jpeg',
    text: "Yeezy Boost 350 v2"
  },
  {
    image: './img/essentialhoodie.jpg',
    text: "Essential Hoodie"
  },
  {
    image: './img/oldschoolvans.jpg',
    text: "Vans Classic Black"
  },
  {
    image: './img/bomberjacket.jpg',
    text: "Olive Green Padded Bomber Jacket"
  },
  {
    image: './img/chelseaboots.jpg',
    text: "Chelsea Boots"
  },
  {
    image: './img/skinnyrippedjeans.jpg',
    text: "Skinny Ripped Jeans Black"
  },
];

data.forEach(createBox);

// Create speech boxes
function createBox(item) {
  const box = document.createElement('div');

  const { image, text } = item;

  box.classList.add('box');

  box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
  `;

  box.addEventListener('click', () => {
    setTextMessage(text);
    speakText();

    // Add active effect
    box.classList.add('active');
    setTimeout(() => box.classList.remove('active'), 800);
  });

  main.appendChild(box);
}

const message = new SpeechSynthesisUtterance();

let voices = [];

function getVoices() {
    voices = speechSynthesis.getVoices();

    voices.forEach(voice => {
        const option = document.createElement('option');

        option.value = voice.name;
        option.innerText = `${voice.name} ${voice.lang}`;

        voicesSelect.appendChild(option);
    });
}

function setTextMessage(text) {
    message.text = text;
}

function speakText() {
    speechSynthesis.speak(message);
}

function setVoice(e) {
    message.voice = voices.find(voice => voice.name === e.target.value);
}

speechSynthesis.addEventListener('voiceschanged', getVoices);

toggleBtn.addEventListener('click', () => document.getElementById('text-box').classList.toggle('show'));

closeBtn.addEventListener('click', () => document.getElementById('text-box').classList.remove('show'));

voicesSelect.addEventListener('change', setVoice);

readBtn.addEventListener('click', () => {
    setTextMessage(textarea.value);
    speakText();
})

getVoices();
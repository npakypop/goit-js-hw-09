const startBtnRef = document.querySelector('[data-start]');
const stopBtnRef = document.querySelector('[data-stop]');
const bodyRef = document.querySelector('body');

startBtnRef.addEventListener('click', onStartBtn);
stopBtnRef.addEventListener('click', onStopBtn);

let intervalId = null;

stopBtnRef.setAttribute('disabled', true);

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStartBtn() { 
    intervalId = setInterval(() => { 
        bodyRef.style.background = getRandomHexColor();
    }, 1000);
    startBtnRef.setAttribute('disabled', true);
    stopBtnRef.removeAttribute('disabled');
}

function onStopBtn() { 
    clearInterval(intervalId);
    stopBtnRef.setAttribute('disabled', true);
    startBtnRef.removeAttribute('disabled');
}


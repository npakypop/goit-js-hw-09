import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css"

const timerRef = document.querySelector('.timer');
const daysRef = document.querySelector('[data-days]');
const hourseRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');
const inputRef = document.querySelector('#datetime-picker');
const buttonRef = document.querySelector('[data-start]');
const valueRef = document.querySelectorAll('.value');

inputRef.addEventListener('focus', onInputFieldFocus);
buttonRef.addEventListener('click', onBtn);
buttonRef.setAttribute('disabled', true);

timerRef.style.cssText = 'display: flex; gap:20px; margin-top: 20px;';
for (const el of valueRef) {
  el.style.fontSize = '40px';
}
for (const el of timerRef.children) { 
  el.style.display = 'flex';
  el.style.flexDirection = 'column';
  el.style.justifyContent = 'center';
  el.style.alignItems = 'center';
}

let intervalId = null;
let date = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    date = selectedDates[0];

    if (selectedDates[0] < new Date()) { 
      alert('Please choose a date in the future');
      return;
    }
    buttonRef.removeAttribute('disabled');
  },
};

function onBtn() { 
  buttonRef.setAttribute('disabled', true);
  intervalId = setInterval(timer, 1000);
}

function timer() {
  if ((date - new Date()) <= 0) { 
    clearInterval(intervalId);
    buttonRef.removeAttribute('disabled');
    return;
  }
  
  const leftTime = convertMs(date - new Date());
  daysRef.textContent = leftTime.days;
  hourseRef.textContent = leftTime.hours;
  minutesRef.textContent = leftTime.minutes;
  secondsRef.textContent = leftTime.seconds;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) { 
  return String(value).padStart(2, '0');
}

function onInputFieldFocus() { 
  flatpickr("#datetime-picker", options); 
}


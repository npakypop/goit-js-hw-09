// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css"

const timerRef = document.querySelector('.timer');
const daysRef = document.querySelector('[data-days]');
const hourseRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');
const inputRef = document.querySelector('#datetime-picker');
const buttonRef = document.querySelector('[data-start]');

daysRef.textContent = convertMs()
inputRef.addEventListener('focus', onInputFieldFocus);
inputRef.addEventListener('blur', onInputFieldBlur);
buttonRef.setAttribute('disabled', true);
// console.log(hourseRef.textContent);
// timerRef.style.display = 'flex';
// timerRef.children.firstElementChild.textContent()


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < new Date()) { 
      alert('Please choose a date in the future');
      return;
    }
    buttonRef.removeAttribute('disabled');
    buttonRef.addEventListener('click', onBtn);
    function onBtn() { 
      setInterval(() => {
        let leftTime = selectedDates[0] - new Date();
        console.log(convertMs(leftTime));
      }, 1000);
    }
  },
};


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}


function onInputFieldFocus(event) { 
  flatpickr("#datetime-picker", options);
  // const time = options.defaultDate.getTime();
  // console.log("time", time);
  // console.log(convertMs(options.defaultDate.getTime()));
  // return convertMs(options.defaultDate.getTime());
}

function onInputFieldBlur(event) { 
  event.target.value = '';
}


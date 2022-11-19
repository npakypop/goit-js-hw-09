import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');
formRef.addEventListener('submit', onForm);

let parameters = {};

function onForm(event) {
  event.preventDefault();
  
  parameters.delay = Number(event.currentTarget.elements.delay.value);
  parameters.step = Number(event.currentTarget.elements.step.value);
  parameters.amount = Number(event.currentTarget.elements.amount.value);

  for (let i = 1; i <= parameters.amount; i += 1) {
    createPromise(i, parameters.delay)
      .then(onSuccess)
      .catch(onError);
    parameters.delay += parameters.step;
  }

  event.currentTarget.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  })
}

const onSuccess = ({ position, delay }) => {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

const onError = ({ position, delay }) => {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
};

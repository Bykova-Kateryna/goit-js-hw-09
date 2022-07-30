import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', createChangePromise);

function createChangePromise(event){
  event.preventDefault()

  let TIME = form.delay.value;
  
  const arrayPromise = [
    {delay: Number(TIME), position: 1}
  ];
  
  for (let i = 2; i <= Number(form.amount.value); i += 1) {
    arrayPromise.push( {delay: TIME = Number(TIME) + Number(form.step.value), position: i})
  }

  const promises = arrayPromise.map((arr) => {
    return createPromise(arr.position, arr.delay)
    .then((messageOk) => {Notiflix.Notify.success(messageOk)})
    .catch((messageErr) => {Notiflix.Notify.warning(messageErr)})
  });
};

function createPromise(position, delay) {
  return new Promise ((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        // Reject
        reject(`❌ Rejected promise ${position} in ${delay}ms`)
      }
    }, delay)
  })
};

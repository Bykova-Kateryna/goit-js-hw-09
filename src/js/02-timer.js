import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const input = document.querySelector("#datetime-picker");
const button = document.querySelector("button");
const day = document.querySelector("[data-days]");
const hour = document.querySelector("[data-hours]");
const minute = document.querySelector("[data-minutes]");
const second = document.querySelector("[data-seconds]");

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
    },
  };

flatpickr(input, options);

button.disabled = true;
const dateNow = new Date();

input.addEventListener('input', changeDay);

function changeDay (){
    if (input._flatpickr.selectedDates[0] > dateNow){
        button.disabled = false;
    } else {
        Notiflix.Notify.warning("Please choose a date in the future")
        return;
    };
};

button.addEventListener('click', timerPlay);

function timerPlay () {
  button.disabled = true;
  input.disabled = true;
  console.dir(button)
  console.dir(input)
  const timerId = setInterval(()=>{
        const selectedDay = input._flatpickr.selectedDates[0];
        const currentDay = new Date();
        const daysDiference = selectedDay - currentDay;
        const { days, hours, minutes, seconds } = convertMs(daysDiference);
        day.textContent = days < 10 ? `0${days}` : days;
        hour.textContent = hours < 10 ? `0${hours}` : hours;
        minute.textContent = minutes < 10 ? `0${minutes}` : minutes;
        second.textContent = seconds < 10 ? `0${seconds}` : seconds;
     
        if(daysDiference < 0){
          clearInterval(timerId)
          day.textContent = `00`;
          hour.textContent = `00`;
          minute.textContent = `00`;
          second.textContent = `00`;
          return
         }
      }, 1000)
   
     return timerId
}

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
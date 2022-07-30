function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };

  const body = document.querySelector("body");
  const startButton = document.querySelector("[data-start]");
  const stopButton = document.querySelector("[data-stop]");
  
  startButton.addEventListener("click", getStart);
  stopButton.disabled = true;

  function randomColor(){
    return body.style.backgroundColor = getRandomHexColor();
  }
  

  function getStart() {
    startButton.disabled = true;
    stopButton.disabled = false;
    const timerId = setInterval(randomColor, 1000);

    stopButton.addEventListener("click", getStop);
    function getStop() {
      startButton.disabled = false;
      stopButton.disabled = true;
      clearInterval(timerId);
    };
  };

let currentQuote = {};
let isTbbtSolved = true;

let textColor = "black";

if (urlParams.has("color")) {
  textColor = urlParams.get("color");
} else {
  textColor = "black";
}

function getRandomTbbtNumber() {
  let randNumber = Math.floor(Math.random() * 11) + 1;
  var amountOfZeros = getAmoutOfZeros(randNumber);
  return amountOfZeros + randNumber;
}

const playTbbt = () => {
  if (isRunning) resetTbbt();

  isTbbtSolved = false;
  isRunning = true;

  console.log("Now playing tbbt");
  currentQuote = tbbtQuotes[getRandomTbbtNumber()];

  document.getElementById("text-holder").innerHTML = currentQuote.quote;
  document.getElementById(
    "text-holder"
  ).style = `color: ${textColor}; font-family: 'Odibee Sans', cursive; font-size: 36px; max-width: 600px; word-break: break-word;`;
};

const guessTbbt = (guessedChar, name) => {
  let guessedName = guessedChar.toLowerCase().replaceAll(/\s/g, "");
  console.log(guessedName);
  console.log(currentQuote.answer);
  if (guessedName == currentQuote.answer) {
    isTbbtSolved = true;
    currentGame = null;
    isRunning = false;

    document.getElementById("text-holder").innerHTML = "";

    if (currentQuote.hasSound) {
      document.getElementById("dynamic-audio").src =
        "./tbbt/sounds/" + currentQuote.id + ".mp3";
      document.getElementById("dynamic-audio").play();
    }

    ComfyJS.Say("Congratz " + name + ". It was " + guessedName + "!!!");
    resetTbbt();
  }
};

const resetTbbt = () => {
  document.getElementById("text-holder").innerHTML = "";
  isTbbtSolved = true;
  currentGame = null;
  isRunning = false;
  gameRunning = false;
};

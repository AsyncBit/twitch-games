let currentQuote = {};
let isTbbtSolved = true;

function getRandomTbbtNumber() {
  let randNumber = Math.floor(Math.random() * 1) + 1;
  var amountOfZeros = getAmoutOfZeros(randNumber);
  return amountOfZeros + randNumber;
}

const playTbbt = () => {
  isTbbtSolved = false;
  console.log("Now playing tbbt");
  currentQuote = tbbtQuotes[getRandomTbbtNumber()];

  document.getElementById("text-holder").innerHTML = currentQuote.quote;
  document.getElementById("text-holder").style = "color: black;";
};

const guessTbbt = (guessedChar, name) => {
  let guessedName = guessedChar.toLowerCase().replaceAll(/\s/g, "");
  console.log(guessedName);
  console.log(currentQuote.answer);
  if (guessedName == currentQuote.answer) {
    isTbbtSolved = true;

    document.getElementById("text-holder").innerHTML = "";

    document.getElementById("dynamic-audio").src =
      "./tbbt/sounds/" + currentQuote.id + ".mp3";
    document.getElementById("dynamic-audio").play();

    ComfyJS.Say("Congratz " + name + ". It was " + guessedName + "!!!");
  }
};

const resetTbbt = () => {
  console.log("Resetting tbbt");
};

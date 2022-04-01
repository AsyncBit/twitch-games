let mute = false;
let auto = true;
let per = "All";
let language = "en";
let botuser = "";
let pokemon;
let pokeDex = "true";
let heightTxt = "Height";
let weightTxt = "Weight";
let foundByTxt = "Found By";
let wasRightTxt = "You Was Right";

let isWtpSolved = false;
let isRunning = false;
let min = 1;
let max = 151;

let resource;
let ext;
let rType = "animated";
let cry = true;
let pokemonID;
let tShow = true;

// Mine
let pokeNum = 0;
let currentName = "";

function getRandomNumber() {
  let randNumber = Math.floor(Math.random() * 151) + 1;
  var amountOfZeros = getAmoutOfZeros(randNumber);
  return amountOfZeros + randNumber;
}

function getAmoutOfZeros(number) {
  if (number < 10) {
    return "00";
  } else if (number >= 10 && number < 100) {
    return "0";
  } else {
    return "";
  }
}

function startWtp() {
  if (isRunning) winReset();

  isWtpSolved = false;
  isRunning = true;

  if (rType === "original") {
    resource = "original";
    ext = "png";
  } else {
    resource = "animated";
    ext = "gif";
  }

  pokeNum = getRandomNumber();

  currentName = pokemonList[pokeNum].name;
  console.log(currentName);

  document.getElementById("ball").style.visibility = "visible";

  document.getElementById("ballVid").play();
  if (!mute) {
    document.getElementById("who-that-pokemon-audio").play();
  }
}

function stopVid() {
  document.getElementById("ball").style.visibility = "hidden";
  showBlurredImage();
  console.log("HIDE");
}

function showBlurredImage() {
  let blurredImage = document.createElement("img");
  blurredImage.src = "./wtp/assets/pokemons/" + pokeNum + ".gif";
  blurredImage.className = "blurred";
  blurredImage.id = "pokemon-image";

  let parentElement = document.getElementById("video-holder");
  parentElement.appendChild(blurredImage);
}

function giveUp() {
  guess(currentName);
}

function skipWtp() {
  winReset();
  startGame();
}

// message, user
function guess(x, n) {
  console.log(x);
  console.log(n);
  let guessedName = x.toLowerCase().replaceAll(/\s/g, "");
  if (guessedName == currentName) {
    isWtpSolved = true;
    currentName = "";
    document.getElementById("pokemon-image").className = "";
    ComfyJS.Say("Congratz " + n + ". You guessed that it was " + guessedName);
    setTimeout(function () {
      winReset();
    }, 5000);
  }
}

function resetWtp() {
  isWtpSolved = false;
  isRunning = false;
  document.getElementById("pokemon-image").remove();
}

function stopGame() {
  location.reload();
}

let autoStart = false;

if (autoStart) {
  startGame();
}

function stopAuto() {
  auto = false;
  winReset();
}

function startAuto() {
  auto = true;
  startGame();
}

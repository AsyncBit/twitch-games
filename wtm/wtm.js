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

let autoWtp = false;
let isWtmSolved = false;
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
let monsterNum = 0;
let currentName = "";
let currentPokemon = {};

function getRandomNumber(max) {
  let randNumber = Math.floor(Math.random() * max) + 1;
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

function startWtm(command) {
  if (isRunning) resetWtm();

  isWtpSolved = false;
  isRunning = true;

  if (rType === "original") {
    resource = "original";
    ext = "png";
  } else {
    resource = "animated";
    ext = "gif";
  }

  if (command == "wtp") {
    // Change number to amount of possible monsters
    monsterNum = getRandomNumber(3);
  }

  currentName = mosnterList[monsterNum].name
    .toLowerCase()
    .replaceAll(/\s/g, "");
  currentPokemon = mosnterList[monsterNum];
  console.log(currentName);
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
  guessWtm(currentName);
}

function skipWtm() {
  resetWtp();
  startGame();
}

// message, user
function guessWtm(x, n) {
  // x = guessedName
  // n = usename of user that guessed
  https: console.log(x);
  console.log(n);
  console.log("currentName");
  console.log(currentName);
  let guessedName = x.toLowerCase().replaceAll(/\s/g, "");
  console.log("guessedName");
  console.log(guessedName);
  if (guessedName == currentName) {
    isWtmSolved = true;
    currentName = "";
    document.getElementById("pokemon-image").className = "";
    ComfyJS.Say(
      "Good job " +
        n +
        ". You guessed the correct monster, it was " +
        guessedName
    );
    /* if (wtpCorrectWebhook != null) {
      fetch(wtpCorrectWebhook, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: n,
        }),
      });
    } */
    setTimeout(function () {
      resetWtm();
    }, 3000);
  }
}

function resetWtm() {
  if (autoWtp) {
    document.getElementById("pokemon-image").remove();
    startWtp("wtp");
  } else {
    isWtmSolved = false;
    isRunning = false;
    gameRunning = false;
    document.getElementById("pokemon-image").remove();
  }
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
  resetWtp();
}

function startAuto() {
  auto = true;
  startGame();
}

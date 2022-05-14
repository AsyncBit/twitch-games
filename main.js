let channel = "";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

if (urlParams.has("channel")) {
  channel = urlParams.get("channel");
  console.log("Configured channel variable");
} else {
  channel = "";
}

if (urlParams.has("token")) {
  ComfyJS.Init(channel, urlParams.get("token"));
  console.log("Channel Send");
}

let gameRunning = false;

const playGame = (game, callbackFunc, gameProps) => {
  console.log("Play game");
  if (gameRunning) {
    return;
  }
  gameRunning = true;
  switch (game) {
    case WTP:
      console.log("Play WTP");
      currentGame = WTP;
      callbackFunc();
      break;
    case TBBT:
      console.log("Play TBBT");
      currentGame = TBBT;
      callbackFunc();
      break;
    default:
      return;
  }
};

const resetGame = (game, callbackFunction) => {
  callbackFunction();
  gameRunning = false;
};

const skipGame = (game, callbackFunction) => {
  callbackFunction();
};

const WTP = Symbol("wtp");
const TBBT = Symbol("tbbt");

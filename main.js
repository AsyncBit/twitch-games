let channel = "";
let token = "";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

if (urlParams.has("token")) {
  token = urlParams.get("token");
} else {
  token = "";
}

if (urlParams.has("channel")) {
  channel = urlParams.get("channel");
} else {
  channel = "";
}

if (token) {
  ComfyJS.Init(channel, token);
  console.log("Channel Send");
} else {
  ComfyJS.Init(channel);
  console.log("No Send");
}

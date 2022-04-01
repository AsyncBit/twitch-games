/*
ComfyJS.onCommand = (user, command, message, flags, extra) => {
  if (
    (flags.broadcaster && command === "wtp") ||
    (flags.mod && command === "wtp")
  ) {
    startGame();
  }
};
*/

/*
ComfyJS.onChat = (user, message, flags, self, extra) => {
  if (!isSolved) {
    message = message.replace("?", "");
    message = message.replace("@", "");
    message = message.split(" ");

    if (per === "All") {
      guess(message[0].toLowerCase(), user);
    } else if (per === "Subs") {
      if (flags.subscriber || flags.mod || flags.broadcaster) {
        guess(message[0].toLowerCase(), user);
      }
    } else if (per === "Vips" || flags.mod || flags.broadcaster) {
      if (flags.vip) {
        guess(message[0].toLowerCase(), user);
      }
    } else if (per === "Vip/Subs") {
      if (flags.vip || flags.subscriber || flags.mod || flags.broadcaster) {
        guess(message[0].toLowerCase(), user);
      }
    }
  }
};
*/

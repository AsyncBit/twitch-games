let currentGame = null;

ComfyJS.onCommand = (user, command, message, flags, extra) => {
  console.log("Command: " + command);
  // WTP
  if (
    (flags.broadcaster && command === "wtp") ||
    (flags.mod && command === "wtp")
  ) {
    playGame(WTP, startWtp, "wtp");
  }
  if (
    (flags.broadcaster && command === "wtp2") ||
    (flags.mod && command === "wtp2")
  ) {
    playGame(WTP, startWtp, "wtp2");
  }
  if (
    (flags.broadcaster && command === "resetwtp") ||
    (flags.mod && command === "resetwtp")
  ) {
    resetGame(WTP, resetWtp);
  }
  if (
    (flags.broadcaster && command === "skipwtp") ||
    (flags.mod && command === "skipwtp")
  ) {
    skipGame(WTP, skipWtp);
  }

  // TBBT
  if (
    (flags.broadcaster && command === "tbbt") ||
    (flags.mod && command === "tbbt")
  ) {
    playGame(TBBT, playTbbt, null);
  }
  if (
    (flags.broadcaster && command === "resettbbt") ||
    (flags.mod && command === "resettbbt")
  ) {
    resetGame(TBBT, resetTbbt);
  }

  //RPSLS
  if (command === "rpsls") {
    let p2Name;
    if (message && message.length > 0) {
      p2Name = message.split(" ")[0];
    } else {
      p2Name = user;
    }
    playRPSLS(user, p2Name);
  }
};

ComfyJS.onChat = (user, message, flags, self, extra) => {
  console.log(message);
  if (!isWtpSolved && currentGame == WTP) {
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

  // TBBT
  if (!isTbbtSolved && currentGame == TBBT) {
    message = message.replace("?", "");
    message = message.replace("@", "");
    message = message.split(" ");

    guessTbbt(message[0].toLowerCase(), user);
  }
};

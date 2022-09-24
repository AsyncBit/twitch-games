class Pokemon {
  constructor(name, pokenum, x, y) {
    this.pokenum = pokenum;
    this.name = name;
    this.x = x;
    this.y = y;
  }
}

class User {
  constructor(username, correct) {
    this.username = username;
    this.correct = correct;
  }
}

const timer = 30000;
let royalActive = false;

let activePokemons = [];
let correctGuesses = [];
let grid = new Grid();

const generatePokemon = (x, y) => {
  let newPokenumber = null;
  if (activePokemons.length === 0) {
    newPokenumber = getNumber();
  } else {
    do {
      newPokenumber = getNumber();
    } while (
      activePokemons.filter((i) => i.pokenum === newPokenumber).length > 0
    );
  }
  const currentPokemonName = pokemonList[newPokenumber].name
    .toLowerCase()
    .replaceAll(/\s/g, "");
  const newPokemon = new Pokemon(currentPokemonName, newPokenumber, x, y);
  activePokemons.push(newPokemon);
  return newPokemon;
};

const guessRoyal = (guessedName, username) => {
  guessedName = guessedName.toLowerCase().replaceAll(/\s/g, "");

  if (activePokemons.map((i) => i.name === guessedName).length >= 1) {
    // Give user point
    correctGuesses.push(username.toLowerCase());

    const guessedPokemon = activePokemons.filter(
      (pokemon) => pokemon.name === guessedName
    )[0];

    // Removing pokemon from list
    activePokemons = activePokemons.filter(
      (pokemon) => pokemon.name !== guessedName
    );

    const newPokemon = generatePokemon(guessedPokemon.x, guessedPokemon.y);
    changeOutPokemon(newPokemon.x, newPokemon.y, newPokemon);
  }
};

const getNumber = () => {
  let randNumber = Math.floor(Math.random() * 151) + 1;
  var amountOfZeros = getZeros(randNumber);
  return amountOfZeros + randNumber;
};

const getZeros = (number) => {
  if (number < 10) {
    return "00";
  } else if (number >= 10 && number < 100) {
    return "0";
  } else {
    return "";
  }
};

function startWtpRoyal() {
  royalActive = true;
  activePokemons = [];
  correctGuesses = [];
  grid = new Grid();

  for (let x = 0; x < 5; x++) {
    for (let y = 0; y < 4; y++) {
      let newPokemon = generatePokemon(x, y);
      grid.addCell(x, y, newPokemon);
    }
  }

  for (let x = 0; x < 5; x++) {
    for (let y = 0; y < 4; y++) {
      console.log(`Pokemon at ${x},${y} is ${grid.rows[x].cells[y].data.name}`);

      const blurredImage = document.createElement("img");
      blurredImage.src =
        "./wtp/assets/pokemons/" + grid.rows[x].cells[y].data.pokenum + ".gif";
      blurredImage.className = "blurred pokemonRoyalCell";

      blurredImage.id = `wtproyal-${x}-${y}`;

      document
        .getElementById("pokemonRoyalContainer")
        .appendChild(blurredImage);
    }
  }
  setTimeout(function () {
    stopWtpRoyal();
  }, timer);
}

const resetWtpRoyal = () => {
  royalActive = false;
  document.getElementById("pokemonRoyalContainer").innerHTML = "";
  gameRunning = false;
};

function stopWtpRoyal() {
  if (!royalActive) return;
  royalActive = false;
  ComfyJS.Say("THE ROYAL IS OVER");

  let result = [];
  correctGuesses.map((name) => {
    if (result.filter((user) => user.name === name).length === 0) {
      result.push({
        name: name,
        amount: 1,
      });
    } else {
      result.map((user) => {
        if (user.name === name) {
          user.amount++;
        }
      });
    }
  });

  if (result.length > 0) {
    result.sort((a, b) => {
      if (a.amount > b.amount) {
        return -1;
      }
      if (a.amount < b.amount) {
        return 1;
      }
      return 0;
    });

    const parent = document.getElementById("pokemonRoyalContainer");
    for (var i = 0; i < parent.children.length; i++) {
      var child = parent.children[i];
      if (child.tagName == "IMG") {
        child.className = "pokemonRoyalCell";
      }
    }
    ComfyJS.Say(`Thank you for participating in the royal! The winner is.....`);
    setTimeout(function () {
      ComfyJS.Say(
        `${result[0].name} with ${result[0].amount} correct guesses!`
      );
      setTimeout(function () {
        parent.innerHTML = "";
        gameRunning = false;
      }, 2000);
    }, 2000);
  } else {
    document.getElementById("pokemonRoyalContainer").innerHTML = "";
    gameRunning = false;
  }
}

function changeOutPokemon(x, y, newPokemon) {
  const cell = document.getElementById(`wtproyal-${x}-${y}`);
  cell.classList = "pokemonRoyalCell";
  setTimeout(function () {
    cell.classList = "blurred pokemonRoyalCell";
    cell.src = "./wtp/assets/pokemons/" + newPokemon.pokenum + ".gif";
  }, 2000);
}
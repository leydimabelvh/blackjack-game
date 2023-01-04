(() => {
  /**
   * 2C = Two of Clubs (Tréboles)
   * 2D= Two of Diamonds (Diamantes)
   * 2H = Two of Hearts (Corazones)
   * 2S = Two of Spades (Espadas)
   */

  let deck = [];

  let types = ["C", "D", "H", "S"],
      specials = ["A", "J", "K", "Q"];

  let playersPoints = [];

  //Referencias de HTML
  const btnGetCard = document.querySelector("#btnGetCard"),
        btnStopGame = document.querySelector("#btnStopGame"),
        btnNewGame = document.querySelector("#btnNewGame");

  const tagPoints = document.querySelectorAll("span");

  const playersCards = document.querySelectorAll(".cardGame__container");

  //Deshabilitar botones
  btnGetCard.disabled = true;
  btnStopGame.disabled = true;

  //Función que inicializar el juego
  const initialiseGame = (numberPlayers = 2) => {
    console.clear();

    //Resetear baraja
    deck = createDeck();

    //Resetear puntos
    playersPoints = [];
    for (let i = 0; i < numberPlayers; i++) {
      playersPoints.push(0);
    }
    console.log({ playersPoints });

    //Resetear texto de puntaje
    tagPoints.forEach(element => element.innerText = 0);

    //Remover imagen de carta
    playersCards.forEach(element => element.innerHTML = "");

    //Habilitar botones
    btnGetCard.disabled = false;
    btnStopGame.disabled = false;

  };

  //Función que crea una nueva baraja
  function createDeck() {
    deck = [];

    for (let i = 2; i < 11; i++) {
      for (const type of types) {
        deck.push(i + type);
      }
    }

    for (const special of specials) {
      for (const type of types) {
        deck.push(special + type);
      }
    }

    return _.shuffle(deck);
  }

  //Función que permite tomar una carta de la baraja
  const getCard = () => {
    if (deck.length === 0) {
      throw "Error: No hay cartas en la baraja.";
    }

    return deck.pop();
  };

  //Función que permite saber el valor de la carta
  const showCardValue = (card) => {
    const value = card.substring(0, card.length - 1);

    return isNaN(value) ? (value === "A" ? 11 : 10) : value * 1;
  };

  const accumulatePoints = (card, shift) => {
    // playersPoints[shift] = playersPoints[shift] + showCardValue();
    playersPoints[shift] += showCardValue(card);

    tagPoints[shift].innerText = playersPoints[shift];

    return playersPoints[shift];
  };

  const showImageCard = (card, shift) => {
    //Insertar imagen de carta
    const imageCard = document.createElement("img");
    imageCard.src = `./assets/images/cartas/${card}.png`;
    imageCard.classList.add("cartGame__image");
    imageCard.alt = "Image of a deck of cards";
    imageCard.width = "120";
    playersCards[shift].append(imageCard);
  };

  const determinateResult = () => {

    const [minimumPoints, computerPoints] = playersPoints ;

    setTimeout(() => {
        //Mostrar resultados
        if (computerPoints > 21) {
          alert("¡Ganó el jugador!");
          console.warn("¡Ganó el jugador!");
        } else if (minimumPoints > 21) {
          alert("¡Ganó la computadora!");
          console.warn("¡Ganó la computadora!");
        } else if (computerPoints === minimumPoints) {
          alert("Empate, niguno ganó.");
          console.warn("Empate, niguno ganó");
        } else {
          alert("¡Ganó la computadora!");
          console.warn("¡Ganó la computadora!");
        }
      }, 100);
  }

  const generateComputerShift = (minimumPoints) => {
    let computerPoints = 0;

    do {
      const card = getCard();

      //Acumular puntos de juagdor
      accumulatePoints(card, playersPoints.length - 1);

      //Insertar imagen de carta
      showImageCard(card, playersPoints.length - 1);

    } while ((computerPoints < minimumPoints) && (minimumPoints <= 21));

    determinateResult();
  };

  //Eventos
  btnGetCard.addEventListener("click", () => {
    const card = getCard();

    const playerPoints = accumulatePoints(card, 0);

    //Insertar imagen de carta
    showImageCard(card, 0);

    //Control de puntos
    if (playerPoints > 21) {
      console.warn("Lo siento, perdiste.");
      btnGetCard.disabled = true;
      btnStopGame.disabled = true;
      generateComputerShift(playerPoints);
    } else if (playerPoints === 21) {
      console.warn("¡Genial, 21!");
      btnGetCard.disabled = true;
      btnStopGame.disabled = true;
      generateComputerShift(playerPoints);
    }
  });

  btnStopGame.addEventListener("click", () => {
    btnGetCard.disabled = true;
    btnStopGame.disabled = true;

    generateComputerShift(playerPoints);
  });

  btnNewGame.addEventListener("click", () => {
    initialiseGame();
  });
})();

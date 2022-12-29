/**
 * 2T = Two of Clubs (Tréboles)
 * 2D= Two of Diamonds (Diamantes)
 * 2H = Two of Hearts (Corazones)
 * 2S = Two of Spades (Espadas)
 */

let deck = [];
let types = ['T', 'D', 'H', 'S'];
let specials = ['A', 'J', 'K', 'Q'];

//Función que crea una nueva baraja
function createDeck() {
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

    // console.log(deck);

    deck = _.shuffle( deck );

    console.log(deck);

    return deck;
}

createDeck();

//Función que permite tomar una carta de la baraja
const getCard = () => {

    if (deck.length === 0) {
        throw 'Error: No hay cartas en la baraja.';
    } 

    const card = deck.pop();
        
    console.log(deck);
    console.log(card);

    return card;
}

getCard();

//Función que permite saber el valor de la carta
const showCardValue = (card) => {
    // const value = card[0];
    const value = card.substring(0, card.length - 1);
    //let points = 0; 

    // if (isNaN(value)) {
    //     points = (value === 'A') ? 11 : 10;
    // } else {
    //     points = value * 1;
    // }

    // (isNaN(value)) ? (points = (value === 'A') ? 11 : 10) : points = value * 1;
    return ( isNaN(value) ) ? 
            ( ( value === 'A' ) ? 11 : 10 ) 
            : value * 1;

}

// showCardValue(getCard());
showCardValue('AC');



//Initializing before starting the card game
const Scraper = require('./quizzlet');
console.log('Starting scraper...');
function run() {
  return new Promise(async (resolve, reject) => {
    // await Scraper.start();
    let cards = require('./data.json');

    const LAST_CARD = 0;
    const LEARNING_WINDOW = 20;
    const RANDOM = true;
    const REVERSE = false;
    const FLIP = false;

    let newSet = cards.slice(LAST_CARD, LAST_CARD + LEARNING_WINDOW);
    if (RANDOM) {
      newSet = shuffle(newSet, 30);
    }
    if (REVERSE) {
      newSet = newSet.reverse();
    }
    //CHANGE FOR RTL SUPPORT
    let temp;
    newSet = newSet.map(card => card.map(sentance => sentance.split('').reverse().join('')));

    return resolve(newSet);
  })
  
}

function shuffle(array, times) {
  let number;
  let temp;
  let tempArr = array;
  let tempRandom;
  for (let i = 0; i < array.length; i++) {
    temp = tempArr[i];
    tempRandom = Math.floor(Math.random() * array.length);
    tempArr[i] = tempArr[tempRandom];
    tempArr[tempRandom] = temp;
  }

  return tempArr;
}

run().then(cards => {
  
});

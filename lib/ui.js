var the_deck, myHand, stockpile;

function drawHandFromDeck(num_cards) {
  for (i=0; i<num_cards; i++) {
    myHand.add(stockpile.draw());
    myHand.cardList[myHand.cardList.length - 1].facedown = false;
  }
}

function setupCards() {
  // initialize the deck
  the_deck = new Deck();

  the_deck.shuffle();

  // dump all deck cards into the stockpile
  stockpile = new Stack();
  for (i=0; i<52; i++) {
    stockpile.add(the_deck.draw());
  }

  drawHandFromDeck(5);
}

setupCards();

$('<h1>').text('Cardz!').appendTo('body');

$.template('card', '<div id="card_${id}" class="card"><span class="suit">${number}</span><span class="suit">${number}</span></div>');
$.template('card_area', '<section id="${id}"><h2>${header}</h2></div>');

var hand_area = $.tmpl('card_area', { id: 'hand_area', header: 'Hand' }).appendTo('body');
var card_target = $('<section class="card_holder">').appendTo(hand_area).sortable({ placeholder: 'place' });

var deck_area = $.tmpl('card_area', { id: 'deck_area', header: 'Deck' }).appendTo('body');
var card_target = $('<section class="card_holder">').appendTo(hand_area).sortable({ placeholder: 'place' });

function addCard(number) {
  $.tmpl('card', { number: number }).appendTo(card_target).card();
}

addCard('5');
addCard('A');
addCard('J');
addCard('9');
addCard('K');

addCard(stockpile.cardList[stockpile.cardList.length - 1].logicalRank());
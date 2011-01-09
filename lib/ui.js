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

$.template('card', '<div id="card_${id}" class="card"><span class="suit">${rank}</span><span class="suit">${rank}</span></div>');
$.template('card_area', '<section id="${id}"><h2>${header}</h2></div>');

var hand_area = $.tmpl('card_area', { id: 'hand_area', header: 'Hand' }).appendTo('body');
var card_target = $('<section class="card_holder">').appendTo(hand_area).sortable({ placeholder: 'place' });

var deck_area = $.tmpl('card_area', { id: 'deck_area', header: 'Deck' }).appendTo('body');
var deck_target = $('<section class="card_holder">').appendTo(deck_area).sortable({ placeholder: 'place' });

function addCardSimple(rank, target) {
  $.tmpl('card', { rank: rank }).appendTo(target).card();
}

function addCard(card, target) {
  card.rank = card.logicalRank();
  $.tmpl('card', card).appendTo(target).card();
}

addCardSimple('5', card_target);
addCardSimple('A', card_target);
addCardSimple('J', card_target);
addCardSimple('9', card_target);
addCardSimple('K', card_target);

addCard(stockpile.cardList[stockpile.cardList.length - 1], deck_target);
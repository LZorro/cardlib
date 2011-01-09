var the_deck, myHand, stockpile;

function setupCards() {
  // initialize the deck
	the_deck = new Deck();
  // console.log("pokerdeckz");
  // console.log(pokerdeck);

	the_deck.shuffle();
	
	// dump all deck cards into the stockpile
	stockpile = new Stack();
	for (i=0; i<52; i++)
	{
		stockpile.add(the_deck.draw());
	}
  // console.log("stockpile:");
  // console.log(stockpile);
	
	// deal a number of cards from the stock into a hand
	var handSize = 5;
	myHand = new Hand();
	for (i=0; i<handSize; i++)
	{
		myHand.add(stockpile.draw());
		myHand.cardList[i].facedown = false;
	}
  // console.log("myHand:");
  // console.log(myHand.cardList);
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
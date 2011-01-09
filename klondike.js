 /* Klondike Solitare
 * written by Tim Volpe
 * 1/9/11
 * HTML5 Tools Jam - www.bostongamejams.com
 *
 * A demonstration of the playing card libraries.
*/

var the_deck, layout, wastepile;

// function drawHandFromDeck(num_cards) {
  // for (i=0; i<num_cards; i++) {
    // myHand.add(stockpile.draw());
    // myHand.cardList[myHand.cardList.length - 1].facedown = false;
  // }
// }

function setupCards() {
	// initialize the deck
	the_deck = new Deck();
	the_deck.shuffle();
  
	// layout
	layout = new Array(7);
	for (i=0; i<7; i++)
	{
		layout[i] = new Stack();
	}
	console.log(layout);
	
	// distribute cards from deck to layout
	for (i=0; i<7; i++)
	{
		for (j=0; j<=i; j++)
		{
			deal(the_deck, layout[i]);
		}
	}
	
	for (i=0; i<7; i++)
	{
		layout[i].top.flip();
	}
  
	// define wastepile - contains 1 card
	wastepile = new Stack();
	deal(the_deck, wastepile);
};

setupCards();

$('<h1>').text('Cardz!').appendTo('body');

$.template('card', '<div id="card_${id}" class="card"><span class="suit">${rank}</span><span class="suit">${rank}</span></div>');
$.template('card_area', '<section id="${id}"><h2>${header}</h2></div>');

var hand_area = $.tmpl('card_area', { id: 'hand_area', header: 'Hand' }).appendTo('body');
var card_target = $('<section class="card_holder">').appendTo(hand_area).sortable({ placeholder: 'place' });

var deck_area = $.tmpl('card_area', { id: 'deck_area', header: 'Deck' }).appendTo('body');
var deck_target = $('<section class="card_holder">').appendTo(deck_area).sortable({ placeholder: 'place' });

// function addCardSimple(rank, target) {
  // $.tmpl('card', { rank: rank }).appendTo(target).card();
// }

function addCard(card, target) {
  card.rank = card.logicalRank();
  $.tmpl('card', card).appendTo(target).card();
}

// addCardSimple('5', card_target);
// addCardSimple('A', card_target);
// addCardSimple('J', card_target);
// addCardSimple('9', card_target);
// addCardSimple('K', card_target);

// addCard(stockpile.cardList[stockpile.cardList.length - 1], deck_target);

var four_stack = new Stack();
stockpile.drawCards(5, function(card) {
  addCard(card, deck_target);
});
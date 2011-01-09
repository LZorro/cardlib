var the_deck, myHand, stockpile;

function addCardSimple(rank, target) {
  $.tmpl('card', { rank: rank }).appendTo(target).card();
}

function addCard(card, target) {
  card.rank = card.logicalRank();
  $.tmpl('card', card).appendTo(target).card({ card: card });
}

function drawHandFromDeck(num_cards) {
  for (i=0; i<num_cards; i++) {
    myHand.add(stockpile.draw());
    myHand.cardList[myHand.cardList.length - 1].facedown = false;
  }
}

function createCascade(num) {
  var stack_one_target = $('<section class="card_holder cascade">').appendTo(stacks_area);
  var new_cascade_stack = new Stack({ cascade: 'vertical' });
  new_cascade_stack.stack_rules = function(addCard) 
  {
	// check that we can put Kings only into empty stacks
	if (this.cardList.length == 0)
	{
		if (addCard.rank == 13)
			return true;
		else
			return false;
	} 
	// check if the new card is exactly one rank below the top of the stack
	else if (addCard.rank == (this.top.rank - 1))
	{
		// card is of the appropriate rank - check for suit
		if (this.top.suit == "Clubs" || this.top.suit == "Spades")
			if (addCard.suit == "Diamonds" || addCard.suit == "Hearts")
				return true;
			else 
				return false;
		else
			if (addCard.suit == "Clubs" || addCard.suit == "Spades")
				return true;
			else
				return false;
	}
	else
		return false;
  };

  stockpile.drawCards(num, function(card) {
    addCard(card, stack_one_target);
    new_cascade_stack.add(card);
  });
  new_cascade_stack.top.flip();

  return stack_one_target.cascade({ stack: new_cascade_stack });
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

// $('<h1>').text('Cardz!').appendTo('body');

$.template('card', '<div id="card_${id}" class="card"><span class="suit">${rank}</span><span class="suit">${rank}</span></div>');
$.template('card_area', '<section id="${id}"><h2>${header}</h2></section>');

// var hand_area = $.tmpl('card_area', { id: 'hand_area', header: 'Hand' }).appendTo('body');
// var card_target = $('<section class="card_holder">').appendTo(hand_area).sortable({ placeholder: 'place' });
// 
// addCardSimple('5', card_target);
// addCardSimple('A', card_target);
// addCardSimple('J', card_target);
// addCardSimple('9', card_target);
// addCardSimple('K', card_target);

var deck_area = $.tmpl('card_area', { id: 'deck_area', header: 'Deck' }).appendTo('body');
var deck_target = $('<section class="card_holder">').appendTo(deck_area);

var stacks_area = $.tmpl('card_area', { id: 'stacks_area', header: 'Stacks' }).appendTo('body');

for (i = 1; i <= 7; i++) {
  var cascade = createCascade(i);
  cascade.appendTo(stacks_area);
}

addCard(stockpile.cardList[stockpile.cardList.length - 1], deck_target);
var the_deck, myHand;

function addCardSimple(rank, target) {
  $.tmpl('card', { rank: rank }).appendTo(target).card();
}

function addCard(card, target) {
  card.rankS = card.logicalRank();
  $.tmpl('card', card).appendTo(target).card({ card: card });
}

function drawHandFromDeck(num_cards) {
  for (i=0; i<num_cards; i++) {
    myHand.add(the_deck.draw());
    myHand.cardList[myHand.cardList.length - 1].facedown = false;
  }
}

function createCascade(num) {
  var stack_one_target = $('<section class="card_holder cascade">').appendTo(stacks_area);
  var new_cascade_stack = new Stack({ cascade: 'vertical' });
  new_cascade_stack.stack_rules = function(addCard) {
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

  the_deck.drawCards(num, function(card) {
    addCard(card, stack_one_target);
    new_cascade_stack.add(card, true);
  });
  new_cascade_stack.top.flip();

  return stack_one_target.cascade({ stack: new_cascade_stack });
}

function createFoundation() {
  var stack_one_target = $('<section class="card_holder foundation">').appendTo(foundations_area);
  var new_foundation_stack = new Stack({ cascade: 'none' });
  new_foundation_stack.stack_rules = function(addCard) 
  {
	// check that we can put Aces only into empty foundations
	if (this.cardList.length == 0)
	{
		if (addCard.rank == 1)
			return true;
		else
			return false;
	} 
	// check if the new card is exactly one rank above the top of the stack
	else if (addCard.rank == (this.top.rank + 1))
	{
		// card is of the appropriate rank - check for suit
		if (this.top.suit == addCard.suit)
				return true;
			else 
				return false;
	}
	else
		return false;
		
  };

  return stack_one_target.cascade({ stack: new_foundation_stack });
}

function createWastepile() {
  var stack_one_target = $('<section class="card_holder waste">').appendTo(waste_area);
  var new_waste_stack = new Stack({ cascade: 'none' });

  return stack_one_target.cascade({ stack: new_waste_stack });
}

function createDrawpile() {
  var stack_one_target = $('<section class="card_holder deck">').appendTo(deck_area);
  var new_deck_stack = new Stack({ cascade: 'none' });

  return stack_one_target.cascade({ stack: new_deck_stack });
}

function setupCards() {
  // initialize the deck
  the_deck = new Deck();
  the_deck.shuffle();
}

setupCards();

// $('<h1>').text('Cardz!').appendTo('body');

$.template('card', '<div id="card_${id}" class="card"><span class="suit">${rankS}</span><span class="suit">${rankS}</span></div>');
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
var deck_target = $('<section class="card_holder blah">').appendTo(deck_area);

var foundations_area = $.tmpl('card_area', { id: 'foundations_area', header: 'Foundations' }).appendTo('body');

var stacks_area = $.tmpl('card_area', { id: 'stacks_area', header: 'Stacks' }).appendTo('body');

for (i = 1; i <= 7; i++) {
  var cascade = createCascade(i);
}

for(i=0; i < the_deck.cardList.length; i++) {
  card = the_deck.cardList[i];
  card.facedown = false;
	addCard(card, deck_target);
}
deck_target.cascade({ stack: the_deck });

for (i=1; i <= 4; i++) {
  var foundation = createFoundation();
  foundation.appendTo(foundations_area);
}

// var waste_area = $.tmpl('card_area', { id: 'waste_area', header: 'Waste Pile' }).prependTo('body');
// var wastepile = createWastepile();
// wastepile.appendTo(waste_area);

$('#deck_area .card').draggable({ revert: true });
$('.card_holder, .card_holder .card').droppable({
	drop: function(event, ui) {
	  var cardToMoveDOM = ui.draggable;
	  var cardToMove = cardToMoveDOM.card('getCard');
    cardToMove.facedown = false;
	  var cascade = $(this).hasClass('card_holder') ? $(this) : $(this).parent('.cascade');//.parent('.cascade');
	  var stack = cascade.cascade('getStack');
	  var candidateStackDOM = cardToMoveDOM.hasClass('card_holder') ? cardToMoveDOM : cardToMoveDOM.parent('.card_holder');
	  var candidateStack = candidateStackDOM.cascade('getStack');
	  var add_was_valid = deal(candidateStack, stack);
	  if (add_was_valid) {
      addCard(cardToMove, cascade);
  	  cascade.cascade('refresh');
	    cardToMoveDOM.remove();
	    candidateStack.top.facedown = false
	    candidateStackDOM.cascade('refresh');
	  }
	}
});

$('#stacks_area .card').live('click', function() {
  if (card = $(this).card('getCard')) {
    card.facedown = false;
    $(this).card('draw');
  }
});

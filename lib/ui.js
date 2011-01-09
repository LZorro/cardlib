function setupCards() {
  // initialize the deck
	var pokerdeck;
	pokerdeck = new Deck();
  // console.log("pokerdeckz");
  // console.log(pokerdeck);

	pokerdeck.shuffle();
	
	// dump all deck cards into the stockpile
	stockpile = new Stack();
	for (i=0; i<52; i++)
	{
		stockpile.add(pokerdeck.draw());
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

// $('<section>').appendTo('body').addClass('card').append('<p>').text('Deck').card();

$.template('card', '<div id="card_${id}" class="card"><span class="suit">${number}</span><span class="suit">${number}</span></div>');

// $.tmpl('card', { id: 1, number: 'A' }).appendTo('body')
//   .find('.suit:first').css({ top: '5px', left: '5px' }).end()
//   .find('.suit:last').css({ bottom: '5px', right: '5px' });

var card_target = $('<section>').appendTo('body');

function addCard(number) {
  $.tmpl('card', { number: number }).appendTo(card_target).card();
}

addCard('5');
addCard('A');
addCard('J');
addCard('9');
addCard('K');
 /* Card library functions
 * written by Tim Volpe
 * 1/8/11
 * HTML5 Tools Jam - www.bostongamejams.com
*/

/* *******************
	Card
		an object that contains some properties
		default properties: bool facedown, bool tapped
		poker default properties: rank, suit
		functions: flip, tap, onClick
*/
var Card = Klass.extend({
	// init: creates a new poker Card
	//		r: rank
	//		s: suit
	init: function(r, s)
	{
		this.facedown 	= true;
		this.tapped	 	= false;
		this.rank 		= r;
		this.suit 		= s;
	},
	
	// flip: turn the card face-up or face-down
	flip: function()
	{
		this.facedown = !this.facedown;
	},
	
	// tap: turn the card sideways or not
	tap: function()
	{
		this.tapped = !this.tapped;
	},
	
	// onClick: what happens to a card when it is clicked
	onClick: function()
	{
		// testing by tapping the card
		this.tap();
	}
});

/* ********************
	Deck
		an array of Cards
		properties: size
		functions:
			create (default: a standard 52-card poker deck)
			shuffle
*/
var Deck = Klass.extend({
	// init: creates a standard 52-card poker deck
	init: function()
	{
		this.card = new Array(52);
		for (i=1; i<14; i++) 
		{
			this.card[i-1] 		= new Card(i, "Clubs");
			this.card[i-1+13] 	= new Card(i, "Diamonds");
			this.card[i-1+26] 	= new Card(i, "Hearts");
			this.card[i-1+39] 	= new Card(i, "Spades");
		}
	},
	
	// shuffle: randomizes the order of the cards in the deck
	shuffle: function()
	{
		// TODO: elaborate randomization goes here
		console.log("Deck is shuffled.");
	},
	
	// draw: removes a card from the Deck and "moves" it to a new destination
	draw: function()
	{
		return this.card.pop();
		
		// return a success value
		//return true;
	},
});

/* ********************
	Stack
		a stack of cards
		typical uses: stock (draw pile), discard (waste/graveyard), foundation
		properties: top, bottom, cascade [horizontal, vertical, none], size
		functions: add, draw(destination), onClick
*/
var Stack = Klass.extend({
	// init: creates an empty stack
	init: function()
	{
		this.cardList 	= new Array();
		//this.top 		= this.cardlist[0];
		//this.bottom 	= this.cardlist[0];
		this.cascade 	= "none";
	},
	
	// add: adds a card to the Stack
	//		addCard: the card attempting to be added to the Stack
	add: function(addCard)
	{
		// TODO: define rules by which cards can be added
		// default: the card is automatically added
		this.cardList.push(addCard);
		this.top = this.cardList[this.cardList.length];
		
		// return a success value
		// default: automatic success
		return true;
	},
	
	// draw: removes a card from the stack and "moves" it to a new destination
	draw: function()
	{
		// TODO: error checking, elaboate moving mechanism
		// default: just remove the card
		this.cardList.pop();
		
		// return a success value
		// default: automatic success
		return true;
	},
	
	// onClick: what happens when the top of the Stack is clicked
	onClick: function()
	{
		// TODO: something
	}
});


/* ********************
	Hand
		a specialized Stack of cards 
		properties: sorted
*/
var Hand = Stack.extend({
	// init: creates an empty Hand
	init: function() 
	{
		this._super();
		this.cascade = "hand";	// special case to draw hand
		this.sorted = false;
	},
	
	// toggleSort: changes whether the Hand is sorted or not
	toggleSort: function()
	{
		this.sorted = !this.sorted;
		if (this.sorted)
		{
			this.sort();
		}
	},
	
	// sort: sort the Hand by some value
	sort: function()
	{
		// TODO: elaborate sort function
		console.log("Hand is now sorted.");
	}
});

// -------------------------------------------------------------
	var pokerdeck;
	pokerdeck = new Deck();
	console.log(pokerdeck);

	pokerdeck.shuffle();
	
	//stockPile = new Stack();
	
	myHand = new Hand();
	//var movecard = pokerdeck.draw();
	//myHand.add(pokerdeck.draw());
	//myHand.add(movecard);
	console.log(myHand);
	
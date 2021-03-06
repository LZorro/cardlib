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

  logicalRank: function() {
    switch(this.rank) {
      case 11:
        return 'J';
      case 12:
        return 'Q';
      case 13:
        return 'K';
      case 1:
        return 'A';
      default:
        return this.rank.toString();
    }
  }
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
	init: function(opts) {
	  this.options = $.extend({
	    cascade: 'none'
	  }, opts || {});

		this.cardList = new Array();
		this.cascade 	= this.options.cascade;
		this.top		= null;
	},
	
	// stack_rules: defines whether or not the specified card can be added to the stack
	// 		returns: true if the card can be added, false if not
	stack_rules: function(addCard)
	{
		// default: always add the card, so always true
		return true;
	},	
	
	// add: adds a card to the Stack
	//		addCard: the card attempting to be added to the Stack
	//		returns: Boolean - whether the addition to the Stack was successful
	//    force:   Boolean - whether to 'force' the add (ignore rules)
	add: function(addCard, force)
	{
		// determine if the card can be added to the stack
		var canBeAdded = force || this.stack_rules(addCard);
		if (canBeAdded)
		{
			// if so, push to the stack and update the top pointer
			this.cardList.push(addCard);
			this.top = this.cardList[this.cardList.length-1];
			return true;
		}
		else
		{
			// card cannot be added, add failed
			return false;
		}		
	},
	
	// draw: removes a card from the stack 
	//		returns: the card that was removed from the Stack
	draw: function()
	{
		// TODO: error checking, elaboate moving mechanism
		// default: just remove the card
		return this.cardList.pop();
		
		// return a success value
		// default: automatic success
		//return true;
	},

  drawCards: function(num, callback) {
    for (i = 0; i < num; i++) {
      callback(this.cardList.pop());
    }
  },
	
	// onClick: what happens when the top of the Stack is clicked
	onClick: function()
	{
		// TODO: something
	}
});

/* ********************
	Deck
		an array of Cards
		properties: size
		functions:
			shuffle
*/
var Deck = Stack.extend({
	// init: creates a standard 52-card poker deck
	init: function()
	{
	  this._super();

		this.cardList = new Array(52);
		for (i=1; i<14; i++) 
		{
			this.cardList[i-1] 		= new Card(i, "Clubs");
			this.cardList[i-1+13] 	= new Card(i, "Diamonds");
			this.cardList[i-1+26] 	= new Card(i, "Hearts");
			this.cardList[i-1+39] 	= new Card(i, "Spades");
		}
	},
	
	// shuffle: randomizes the order of the cards in the deck
	shuffle: function()
	{
		// Uses the Fisher-Yates randomizing shuffle algoriithm
		var i = this.cardList.length;
		if (i == 0) 
			return false;		// error catching: no sense in randomizing an empty deck
		while (--i)
		{
			var j = Math.floor(Math.random() * (i+1));
			var tempi = this.cardList[i];
			var tempj = this.cardList[j];
			this.cardList[i] = tempj;
			this.cardList[j] = tempi;
		}
		//console.log("Deck is shuffled.");
	}
});


/* ********************
	Hand
		a specialized Stack of cards 
		properties: sorted, handLimit
*/
var Hand = Stack.extend({
	// init: creates an empty Hand
	init: function() 
	{
		this._super();				// inherits the variables of the Stack class
		this.cascade 	= "hand";	// special case when rendering the hand
		this.sorted 	= false;	// toggle for keeing the hand sorted
		this.handLimit 	= 7;		// arbitrary hand limit
	},
	
	// inherit default stack_rules
	stack_rules: function(addCard) {
		//return this._super(addCard);
		// Cannot add more cards to the hand if you are at the hand limit
		if (this.cardList.length >= this.handLimit)
			return false;
		else
			return true;
	},
	
	// toggleSort: changes whether the Hand is sorted or not
	toggleSort: function()
	{
		this.sorted = !this.sorted;
		// if the hand is now supposed to be sorted, sort it
		if (this.sorted)
		{
			this.sortCards();
		}
	},
	
	// **** NOTE: this sort function might better serve in the "view" mode ****
	// sortCards: sort the Hand by some value
	sortCards: function()
	{
		// sorts first by suit, then rank in ascending order
		this.cardList.sort(function(a, b) {
			if (a.suit < b.suit)
				return -1;
			if (a.suit > b.suit)
				return 1;
			return (a.rank - b.rank);
		});
		// console.log("Hand is now sorted.");
	}
});

/* ********************
	deal: Moves a Card from one Stack to another
		if the card cannot be placed in the destination, it returns to the source
		source: where it pulls the topmost Card from
		destination: which Stack it tries to add the Card to
		returns: true if successful, false otherwise
*/
function deal(source, destination)
{
	var targetCard;
	targetCard = source.draw();
	
	if (destination.add(targetCard))
		return true;
	else
	{
		// "cancel" the movement - the card has to be put directly back to irs original place
		source.cardList.push(targetCard);
		return false;
	}
};
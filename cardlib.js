 /* Card library functions
 * written by Tim Volpe
 * 1/8/11
 * HTML5 Tools Jam - www.bostongamejams.com
*/

/* *******************
	Card
		an object that contains some properties
		default properties: bool facedown, bool tapped
		poker default properties: suit, rank
		functions: flip, tap, onClick
*/
function Card()
{
	// ---- properties
	var facedown;		// boolean, whether or not the card is face down	
	var tapped;			// boolean, whether or not the card is tapped (turned sideways)
	
	// poker card properties
	var suit, rank;
	
	// initialization
	this.facedown = true;
	this.tapped = false;
	
	// ---- functions
	
	// flip: turn the card face up or face down
	function flip()
	{
		this.facedown = !this.facedown;
	}
	
	// tap: turn the card sideways or not
	function tap()
	{
		this.tapped = !this.tapped;
	}
	
	// onClick: what happens to a card when it is clicked (overridable)
	function onClick()
	{
		// something goes here
		
		// test:
		this.tap();
	}
	
}

/* ********************
	Deck
		an array of Cards
		properties: size
		functions:
			create (default: a standard 52-card poker deck)
			shuffle
*/
function Deck()
{
	// ---- properties
	var size;	// how many cards are in the deck
	
	// initialization
	this.size = 0;		
	
	// ---- functions
	
	// create: create a Deck by reading from a directory
	function create()
	{
		// default: poker deck
		
		// return a success value (or the Deck if sucessful, null otherwise)
	}
	
	// shuffle: randomizes the order of the cards in the Deck
	function shuffle()
	{
		// random shuffle code here
	}
}

/* ********************
	Stack
		a stack of cards
		typical uses: stock (draw pile), discard (waste/graveyard), foundation
		properties: top, bottom, cascade [horizontal, vertical, none], size
		functions: add, draw(destination), onClick
*/
function Stack()
{
	// ---- properties
	var top; 		// pointer to the card that the user can typically access
	var bottom; 	// pointer to the card at the bottom of the pile
	var cascade;	// determines whether the user can see the cards underneat the top
					// 		values: horizontal, vertical, none
	var size;		// how many cards are in the stack
	
	// initialization
	this.cascade = "none";
	this.size = 0;
	
	// ---- functions
	
	// add: adds a Card into the Stack
	//		usually by a set of rules (overridable)
	function add()
	{
		// default: push the Card onto the top of the stack
		
		// return a success value
	}
	
	// draw: pulls a Card from the Stack and moves it to another Stack (destination)
	function draw()
	{
		// draw code
		
		// return a success code (?)
	}
	
	// onClick: what happens to the top Card when the Stack is clicked (overridable)
	function onClick()
	{
		// something happens here
	}
}

/* ********************
	Hand
		a specialized Stack of cards 
		properties: sorted
*/
function Hand()
{
	// ---- properties
	// (inherit properties of Stack)
	var sorted;		// boolean, whether or not the hand is sorted by some value
	
	// initialization
	this.sorted = false;
	
	// ---- functions
	// (inherit functions from Stack)
	
	
}


function main ()
{
	/* this would be a test funtion to get something to run */
	document.write("Hi");
}

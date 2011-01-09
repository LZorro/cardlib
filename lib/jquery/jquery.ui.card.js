var CardWidget = {
	options: {
		card: null
	},

  _suit: 'S',

  _create: function() {
    // this.element.find('section:not(:first)').hide();
    this._init_css();
  },

  _init_css: function() {
    this.element.find('.suit:first').css({
      top: '5px',
      left: '5px'
    });

    this.element.find('.suit:last').css({
      bottom: '5px',
      right: '5px'
    });

    var src;
    switch(this.options.card.suit) {
      case 'Clubs':
        src = 'clubs_icon.jpg'; break;
      case 'Hearts':
        src = 'hearts_icon.jpg'; break;
      case 'Spades':
        src = 'spades_icon.jpg'; break;
      case 'Diamonds':
        src = 'diamonds_icon.jpg'; break;
    }
    this.element.append('<img src="images/' + src + '">');
  },

  getCard: function() {
    return this.options.card
  },

  draw: function() {
    console.log('drawing');
    if (this.options.card.facedown) {
      this.element.addClass('face_down');
    } else {
      this.element.removeClass('face_down');
    }
  },

  destroy: function() {
    $.Widget.prototype.destroy.apply(this, arguments);
  }
};

(function($) {
  $.widget('ales.card', CardWidget);
})(jQuery);
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

    // switch(this.options.card.suit) {
    //   
    // }
  },

  getCard: function() {
    return this.options.card
  },

  draw: function() {
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
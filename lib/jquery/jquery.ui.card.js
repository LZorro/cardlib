var CardWidget = {

  _suit: 'S',
  _card: null,

  _create: function() {
    // this.element.find('section:not(:first)').hide();
    this._init_css();
  },

  _init_css: function() {
    console.log('css init', this.element);
    this.element.find('.suit:first').css({
      top: '5px',
      left: '5px'
    });

    this.element.find('.suit:last').css({
      bottom: '5px',
      right: '5px'
    });
  },

  destroy: function() {
    $.Widget.prototype.destroy.apply(this, arguments);
  }
};

(function($) {
  $.widget('ales.card', CardWidget);
})(jQuery);
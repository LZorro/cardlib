var CascadeWidget = {
	options: {
		stack: null
	},
  _stack: null,
  _vertical_increment: 25,
  _horizontal_increment: 40,

  _create: function() {
    this._init_css();
  },

  _init_css: function() {
    console.log(this.options.stack);
    if (this.options.stack.cascade == 'vertical') {
      var increment = this._vertical_increment;
      var top = -increment;
      this.element.find('.card').each(function(i, card) {
        $(card).css({ top: top += increment });
      });
    } else if (this.options.stack.cascade == 'horizontal') {
      var increment = this._horizontal_increment;
      var left = -increment;
      this.element.find('.card').each(function(i, card) {
        $(card).css({ left: left += increment });
      });
    }
    this.element.find('.card').addClass('face_down').filter(':last').removeClass('face_down');
  },

  destroy: function() {
    $.Widget.prototype.destroy.apply(this, arguments);
  }
};

(function($) {
  $.widget('ales.cascade', CascadeWidget);
})(jQuery);
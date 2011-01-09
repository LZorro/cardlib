var CascadeWidget = {
	options: {
		stack: null
	},

  _vertical_increment: 25,
  _horizontal_increment: 40,

  _create: function() {
    this._init_css();
  },

  _init_css: function() {
    if (this.options.stack.cascade == 'vertical') {
      var increment = this._vertical_increment;
      var top = -increment;
      this.element.find('.card').each(function(i, card) {
        $(card).css({ 'margin-top': top += increment, 'z-index': i + 100 });
      });
    } else if (this.options.stack.cascade == 'horizontal') {
      var increment = this._horizontal_increment;
      var left = -increment;
      this.element.find('.card').each(function(i, card) {
        $(card).css({ left: left += increment });
      });
    }

    if (this.options.stack.top) {
      this.options.stack.top.facedown = false;
    }
    this.element.find('.card').card('draw');
    // this.element.css({ height: ((this.element.find('.card').length * this._vertical_increment) + 100) + 'px' });
    this.element.find('.card').draggable({ revert: true });
  },

  refresh: function() {
    this._init_css();
  },

  getStack: function() {
    return this.options.stack;
  },

  destroy: function() {
    $.Widget.prototype.destroy.apply(this, arguments);
  }
};

(function($) {
  $.widget('ales.cascade', CascadeWidget);
})(jQuery);
var CascadeWidget = {
  _stack: null,
  _vertical_increment: 25,

  _create: function() {
    this._init_css();
  },

  _init_css: function() {
    var increment = this._vertical_increment;
    var top = -this._vertical_increment;
    this.element.find('.card').each(function(i, card) {
      $(card).css({ top: top += increment });
    }).addClass('face_down').filter(':last').removeClass('face_down');
  },

  destroy: function() {
    $.Widget.prototype.destroy.apply(this, arguments);
  }
};

(function($) {
  $.widget('ales.cascade', CascadeWidget);
})(jQuery);
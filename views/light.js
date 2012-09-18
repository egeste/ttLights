tt.lights.views.Light = Backbone.View.extend({
  className: 'ttLights light',

  initialize: function() {
    this.model
      .on('change', this.update, this)
      .on('destroy', this.remove, this)
  },

  render: function() {
    this.$el.empty()
      .append($('<div class="beam"/>'))
      .append($('<div class="source"/>'))
      .append($('<div class="body"/>'))
    return this.update()
  },

  update: function() {
    var css = _.extend(_.cssPosition(this.model.attributes), {
      '-webkit-animation-delay': (this.model.get('delay')*-1)+'s'
    })
    this.$el.css(css)
    this.$('.beam').css('background', this.model.color())
    this.$('.source').css('background', this.model.sourceColor())
    return this
  },

  restartAnimation: function() {
    var $el = this.$el,
        animation = $el.css('-webkit-animation-name')
    $el.css('-webkit-animation-name', 'initial')
    _.defer(function() {
      $el.css('-webkit-animation-name', animation)
    })
    return this
  }
});

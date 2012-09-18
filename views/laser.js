tt.lights.views.Laser = Backbone.View.extend({
  className: 'ttLights laser',

  initialize: function() {
    this.model
      .on('change', this.update, this)
      .on('destroy', this.remove, this)
      .on('change:beams', this.render, this)
  },

  render: function() {
    this.$el.empty()
      .append($('<div class="body"/>'))
      .append($('<div class="source"/>'))
    for (var i = 0; i < this.model.get('beams'); i++) {
      this.$el.append($('<div class="beam"><div/></div>'))
    }
    return this.update()
  },

  update: function() {
    var angle = this.model.get('angle'),
        css = _.extend(_.cssPosition(this.model.attributes), {
          '-webkit-transform': 'rotateY('+ angle +'deg)'
        })
    this.$el.css(css)

    var $beams = this.$('.beam'),
        color = this.model.color(),
        speed = this.model.get('speed'),
        delay = this.model.get('delay'),
        spread = this.model.get('spread'),
        slice = spread / $beams.length,
        offset = (angle > 0 ? (slice * -1) : 0)
    $beams.each(function(i, beam) {
      var $beam = $(beam),
          animation = $beam.css('-webkit-animation-name'),
          angleOffset = (slice * (i * -1)) + (spread / 2) + offset,
          delayOffset = (((speed / $beams.length) * i) * -1) + delay
      $beam
        .css({
          '-webkit-animation-name': 'initial',
          '-webkit-animation-delay': delayOffset+'s'
        })
        .children().css({
          background: color,
          '-webkit-transform': 'rotate('+angleOffset+'deg)'
        })
      _.defer(function() {
        $beam.css('-webkit-animation-name', animation)
      })
    })

    return this
  }

});

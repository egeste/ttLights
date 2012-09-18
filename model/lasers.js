tt.lights.model.Laser = Backbone.Model.extend({
  defaults: {
    top: undefined,
    left: undefined,
    right: undefined,
    bottom: undefined,
    angle: 0,
    beams: 5,
    delay: 0,
    speed: 0.5,
    spread: 90,
    color: [0,255,0],
    animation: 'fan90'
  },

  color: function() {
    var rgb = this.get('color').join(',')
    return '-webkit-linear-gradient(left, rgba('+rgb+',0) 0%, rgba('+rgb+',0.2) 40%, rgba(255,255,255,1) 50%, rgba('+rgb+',0.2) 60%, rgba('+rgb+',0) 100%)'
  }
});

tt.lights.model.Lasers = Backbone.Collection.extend({
  model: tt.lights.model.Laser
});

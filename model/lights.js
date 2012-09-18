tt.lights.model.Light = Backbone.Model.extend({
  defaults: {
    top: undefined,
    left: undefined,
    right: undefined,
    bottom: undefined,
    delay: 0,
    speed: 0.5,
    color: [255,255,255],
    animation: 'light-circle'
  },

  color: function() {
    var rgb = this.attributes.color.join(','),
        crgb = _.adjustColor(this.attributes.color, 85, 150).join(',')
    return '-webkit-linear-gradient(left, rgba('+rgb+',0) 0%,rgba('+crgb+',1) 35%,rgba('+crgb+',1) 65%,rgba('+rgb+',0) 100%)'
  },

  sourceColor: function() {
    var rgb = this.attributes.color.join(',')
    return '-webkit-radial-gradient(center, ellipse cover, rgba(255,255,255,1) 35%,rgba('+rgb+',1) 100%)'
  }
});

tt.lights.model.Lights = Backbone.Collection.extend({
  model: tt.lights.model.Light
});

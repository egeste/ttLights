tt.lights.views.Welcome = Backbone.View.extend({
  className: 'settingsOverlay modal ttLights welcome',
  template: _(tt.lights.templates.welcome).template(null, { variable: 'settings' }),
  events: { 'click .close-x': 'close' },

  render: function() {
    this.$el.html(this.template())
    return this
  },

  open: function() {
    if (this.model.get('welcome'))
      util.showOverlay(this.render().$el)
    return this
  },

  close: function() {
    this.model.save('welcome', false)
    util.hideOverlay()
  },
});

tt.lights.views.Stage = Backbone.View.extend({
  className: 'ttLights stage',
  initialize: function() {
    this.collection
      .on('add', this.add, this)
      .on('reset', this.render, this)
  },
  render: function() {
    this.$el.empty()
    this.collection.each(this.add, this)
    return this
  },
  add: function(model) {
    new this.options.LightView({ model: model }).render().$el.appendTo(this.$el)
  }
});

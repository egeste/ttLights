(function() {

  var LightSettings = Backbone.View.extend({
    tagName: 'li',
    events: {
      'click .x': 'destroy',
      'click .light-name': 'open',
      'keyup input': '_valueChanged'
    },
    render: function() {
      this.$el.html(this.template(this.model))
      return this
    },
    open: function() {
      this.$el.toggleClass('open')
    },
    destroy: function() {
      this.model.destroy()
    },
    _valueChanged: function(e) {
      var $target = $(e.target),
          value = $target.val(),
          attr = $target.attr('name')
      if (attr === 'color') value = _.hexToRGB(value)
      this.model.set(attr, value)
    }
  })

  var LightList = Backbone.View.extend({
    events: {
      'click .add-light': '_addLight'
    },
    initialize: function() {
      this.collection.on('add remove', this.render, this)
    },
    render: function() {
      this.$el.empty()
      this.collection.each(function(light) {
        new this.options.ItemView({ model: light }).render().$el.appendTo(this.$el)
      }, this)
      this.$el.append($('<li class="add-light">+</li>'))
      return this
    },
    _addLight: function() {
      this.collection.add(new this.collection.model)
    }
  })

  tt.lights.views.Settings = Backbone.View.extend({
    className: 'settingsOverlay modal ttLights settings',
    template: _(tt.lights.templates.settings).template(null, { variable: 'settings' }),
    events: {
      'click .close-x': 'close',
      'click .export': '_export',
      'click .import': '_import'
    },

    initialize: function() {
      this.model = tt.lights.app.settings
    },

    render: function() {
      this.$el.html(this.template())

      new LightList({
        el: this.$('.lights'),
        collection: tt.lights.app.settings.get('lights'),
        ItemView: LightSettings.extend({
          template: _(tt.lights.templates.light_settings).template(null, { variable: 'light' })
        })
      }).render()

      new LightList({
        el: this.$('.lasers'),
        collection: tt.lights.app.settings.get('lasers'),
        ItemView: LightSettings.extend({
          template: _(tt.lights.templates.laser_settings).template(null, { variable: 'laser' })
        })
      }).render()

      return this
    },

    open: function() {
      util.showOverlay(this.render().$el)
      return this
    },

    close: function() {
      this.model.save()
      util.hideOverlay()
    },

    _export: function() {
      window.location.href = 'data:application/octet-stream;charset=utf-8,'+JSON.stringify(this.model)
    },

    _import: function() {
      var model = this.model,
          reader = new FileReader,
          file = this.$('input[name=import]')[0].files[0]
      reader.onload = function() {
        try { var data = JSON.parse(this.result) }
        catch (e) { console.error(e) }
        model.set(model.parse(data))
        tt.lights.app
          .destroySubViews()
          .createSubViews()
          .renderSubViews()
      }
      reader.readAsText(file, 'utf-8')
    }
  })

})();

(function() {

  var _roomLoaded = function () {
    var defer = $.Deferred(),
        resolveWhenReady = function() {
          if (turntable && ttObjects.getApi()) return defer.resolve()
          setTimeout(resolveWhenReady, 500)
        }
    resolveWhenReady()
    return defer.promise()
  }

  var StyleSheet = Backbone.View.extend({
    tagName: 'link',
    className: 'ttLights stylesheet',
    attributes: {
      rel: 'stylesheet',
      type: 'text/css',
      href: 'data:text/css;base64,'+tt.lights.css
    }
  })

  var MenuItem = Backbone.View.extend({
    className: 'ttLights menuItem',
    events: { 'click': function() { new tt.lights.views.Settings().open() } },
    render: function() {
      this.$el.text('ttLights')
      return this
    }
  })

  tt.lights.app = new (Backbone.View.extend({
    initialize: function() {
      _.bindAll(this, 'render')
      this.settings = new tt.lights.model.Settings
      this.createSubViews()
      $.when(_roomLoaded()).then(this.render)
    },

    createSubViews: function() {
      this.welcome = new tt.lights.views.Welcome({
        model: this.settings
      })

      this.lights = new tt.lights.views.Stage({
        LightView: tt.lights.views.Light,
        collection: this.settings.get('lights')
      })

      this.lasers = new tt.lights.views.Stage({
        LightView: tt.lights.views.Laser,
        collection: this.settings.get('lasers')
      })

      return this
    },

    render: function() {
      $(document.head).append(new StyleSheet().$el)
      $('#menuh .menuItem:last').before(new MenuItem().render().$el)
      this.renderSubViews()
      return this
    },

    renderSubViews: function() {
      this.welcome.open()
      var $floor = $('div#floor-div').parent()
      this.lights.render().$el.prependTo($floor)
      this.lasers.render().$el.prependTo($floor)
      return this
    },

    destroySubViews: function() {
      this.lights.remove()
      this.lasers.remove()
      return this
    },

    destroy: function() {
      this.destroySubViews()
      $('.ttLights').remove()
      this.remove()
      delete tt.lights
    }
  }))

})();

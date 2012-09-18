(function() {

  var COOKIE = 'tt.lights.settings'

  tt.lights.model.Settings = Backbone.Model.extend({
    defaults: function() { return {
      welcome: true,
      lights: new tt.lights.model.Lights([
        {left:'20%',color:[255,0,0]},
        {left:'40%',delay:0.3,color:[0,255,0]},
        {left:'60%',delay:0.6,color:[0,0,255]},
        {left:'80%',delay:0.9,color:[255,0,255]}
      ]),
      lasers: new tt.lights.model.Lasers([
        {top:'110px',left:'5px',angle:45,color:[0,255,0]},
        {top:'110px',right:'5px',angle:-45,delay:0.25,color:[255,0,255]}
      ])
    } },

    initialize: function() {
      this.fetch()
    },

    parse: function(resp) {
      resp.lights && this.get('lights').reset(resp.lights) && delete resp.lights
      resp.lasers && this.get('lasers').reset(resp.lasers) && delete resp.lasers
      return resp
    },

    sync: function(method, model, options) {
      if (method === 'read') {
        try { var settings = JSON.parse($.cookie(COOKIE)) }
        catch (e) { console.error(e) }
        return settings ? options.success(settings) : false
      }

      if (method === 'create') {
        var settings = $.cookie(COOKIE, JSON.stringify(this), { json: true })
        return settings ? options.success(this.toJSON()) : false
      }

      if (method === 'delete') {
        $.cookie(COOKIE, null)
        return true
      }
    },

    toJSON: function() {
      var attrs = _.clone(this.attributes)
      attrs.lights && (attrs.lights = attrs.lights.toJSON())
      attrs.lasers && (attrs.lasers = attrs.lasers.toJSON())
      return attrs
    }
  })

})();

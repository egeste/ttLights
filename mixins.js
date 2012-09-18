(function() {

  var _componentToHex = function(color) {
    var hex = color.toString(16)
    return hex.length == 1 ? "0" + hex : hex
  }

  _.mixin({
    random: function(min, max, round) {
      var random = (Math.random() * max) + min
      return round ? Math.round(random) : random
    },

    randomColor: function() {
      return [
        _.random(0,255,1),
        _.random(0,255,1),
        _.random(0,255,1)
      ]
    },

    adjustColor: function(rgb,percent,min) {
      min = min || 0
      percent = percent/100 || 0
      return _(rgb).map(function(color) {
        if (percent) color = Math.round(color + (color * percent))
        if (min) color = Math.max(color, min)
        return Math.min(color, 255)
      })
    },

    rgbToHex: function(rgb) {
      return "#" + _componentToHex(rgb[0]) + _componentToHex(rgb[1]) + _componentToHex(rgb[2])
    },

    hexToRGB: function(hex) {
      var groups = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return [
        parseInt(groups[1], 16) || 0,
        parseInt(groups[2], 16) || 0,
        parseInt(groups[3], 16) || 0
      ]
    },

    cssPosition: function(properties) {
      var css = {}
      _(['top', 'right', 'bottom', 'left']).each(function(prop) {
        properties[prop] && (css[prop] = properties[prop])
      })
      return css
    }
  })

})();

Scratcher = (function($, public_) {

  public_.Model = Backbone.Model.extend({
    populated :         false,
    referenceAttribute: "id",

    isPopulated: function() {
      return this.populated;
    },

    parse: function(response) {
      this.populated = true;
      return response;
    },

    isNew: function() {
      return this.id == null && this.get(this.referenceAttribute) == null;
    },

    url: function() {
      var base = getValue(this, 'urlRoot') || getValue(this.collection, 'url') || urlError();
      if (this.isNew()) return base;
      var reference = this.get(this.referenceAttribute) || this.id;
      return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + encodeURIComponent(reference);
    }

  });

  getValue = function(object, prop) {
    if (!(object && object[prop])) return null;
    return _.isFunction(object[prop]) ? object[prop]() : object[prop];
  };
  return public_;

})($, Scratcher);



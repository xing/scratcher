Scratcher = (function($, public_) {

  public_.Collection = Backbone.Collection.extend({
    populated : false,

    isPopulated: function() {
      return this.populated;
    },

    parse: function(response) {
      this.populated = true;
      return response[this.key];
    },

    toJSON: function() {
      var attributes = {};
      attributes[this.key] = this.models;
      return $.parseJSON(JSON.stringify(attributes));
    }
  });

  return public_;

})($, Scratcher);



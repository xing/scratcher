Scratcher = (function ($, public_) {

  public_.Router = Backbone.Router.extend({

    initialize: function() {
      this.initModels();
      this.initCollections();
    },

    initModels: function() {
      // implement in subclass
    },

    initCollections: function() {
      // implement in subclass
    },

    display: function(controller) {
      if (window.App.currentController !== undefined) {
        window.App.currentController.close();
      }
      window.App.currentController = controller;
      window.App.currentController.render();
    }

  });

  return public_;

})($, Scratcher);





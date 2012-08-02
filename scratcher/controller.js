Scratcher = (function ($, public_) {

  public_.Controller = Backbone.View.extend({

    initialize: function() {
      _.bindAll(this, "render");
    },

    render: function() {
      this.$el.html(this.template());
      window.scroll(0,0);
      this.addViews();
      yang.App.calcDimentions();
      return this;
    },

    template: function() {
      return HandlebarsTemplates[this.templateName](this.templateJSON());
    },

    // override this is child to have specific json for template
    templateJSON: function() {
      return {};
    },

    close: function() {
      this.off();
      _.each(this.views, function(view) {
        view.close();
      });
      this.undelegateEvents();
    }

  });

  return public_;

})($, Scratcher);





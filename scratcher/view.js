Scratcher = (function ($, public_) {

  public_.View = Backbone.View.extend({
    views:              [],
    templateName:       "override", // change this
    shouldFetch:        true, // or false
    shouldRenderLoader: true, // or false
    shouldRender:       true, // or false
    dataType:           "collection", // or "model" or "none"
    defaultEvents:      true, // or false

    initialize: function() {
      _.bindAll(this, "render", "renderLoader", "navigate");
      this.templateName       = this.options.templateName || this.templateName;
      this.dataType           = this.options.dataType || this.dataType;
      if ( this.dataType === "none") {
        this.shoulFetch        = false;
        this.shoulRenderLoader = false;
        this.defaultEvents     = false;
      } else {
        this.shouldFetch        = this.options.shouldFetch || this.shouldFetch;
        this.shouldRender       = this.options.shoulRender || this.shouldRender;
        this.shouldRenderLoader = this.options.shouldRenderLoader || this.shouldRenderLoader;
        this.defaultEvents      = this.options.defaultEvents || this.defaultEvents;
      }

      if ( this.defaultEvents ) {
        this.initDefaultEventListening();
      }
      this.afterInitialize();
    },

    render: function() {
      if ( this.shouldRender ) {
        if ( this.dataType === "none" || this.dataSource().isPopulated() ) {
          this.$el.html(this.template());
          $("body").removeClass("loading");
          this.addViews();
        } else {
          if ( this.shouldRenderLoader ) {
            this.renderLoader();
          }
          if ( this.shouldFetch ) {
            this.dataSource().fetch();
          }
        }
      } else if ( this.shouldFetch ) {
        this.dataSource().fetch();
      }

      this.afterRender();
      return this;
    },

    dataSource: function() {
      if ( this.dataType === "model" ) {
        return this.model;
      } else if ( this.dataType === "none" ) {
        return new Backbone.Model({});
      } else {
        return this.collection;
      }
    },

    templateJSON: function() {
      return this.dataSource().toJSON();
    },

    initDefaultEventListening: function() {
      if ( this.dataType === "none" ) {
        return;
      }
      if ( this.dataType === "model" ) {
        this.model.on("change", this.render);
      } else {
        this.collection.on("reset", this.render);
        this.collection.on("add", this.render);
        // this.collection.on("change", this.render);
      }
    },

    afterInitialize: function() {
      // hook method, override
    },

    addViews: function() {
      // hook method, override
    },

    afterRender: function() {
      // hook method, override
    },

    navigate: function(event) {
      event.preventDefault();
      var element = $(event.target).closest("a");

      Backbone.history.navigate(element.attr("href"), true);
    },

    template: function() {
      return HandlebarsTemplates[this.templateName](this.templateJSON());
    },

    renderLoader: function() {
      $("body").addClass("loading");
      return this;
    },

    close: function() {
      this.off();
      _.each(this.views, function(view) {
        view.close();
      });
      this.undelegateEvents();
    }

  });

  function loadingTemplate() {
    // return HandlebarsTemplates["shared/_loading"](this.templateJSON());
  }

  return public_;

})($, Scratcher);







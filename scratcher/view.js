Scratcher = (function ($, public_) {

  // requires a model or collection
  // model or collection must have an isPopulated() function
  // required e.g. templateName: "about/index"
  // shouldRenderLoader: true || false
  // shouldFetch: true || false

  public_.View = Backbone.View.extend({
    templateName:       "override", // change this
    shouldFetch:        true, // or false
    shouldRenderLoader: true, // or false
    shouldRender:       true, // or false
    _dataSource:        "collection", // or "model" or "none"

    initialize: function() {
      _.bindAll(this, "render", "renderLoader", "navigate");
      this.templateName       = this.options.templateName || this.templateName;
      this.shouldFetch        = this.options.shouldFetch || this.shouldFetch;
      this.shouldRender       = this.options.shoulRender || this.shouldRender;
      this.shouldRenderLoader = this.options.shouldRenderLoader || this.shouldRenderLoader;
      this._dataSource        = this.options._dataSource || this._dataSource;

      this.setDataSourceEventListening();
      this.additionalEventListening();
    },

    render: function() {
      if ( this.shouldRender ) {
        if ( this._dataSource === "none" || this.dataSource().isPopulated() ) {
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
      }
      return this;
    },

    dataSource: function() {
      if ( this._dataSource === "model" ) {
        return this.model;
      } else if ( this._dataSource === "none" ) {
        return new Backbone.Model({});
      } else {
        return this.collection;
      }
    },

    templateJSON: function() {
      return this.dataSource().toJSON();
    },

    setDataSourceEventListening: function() {
      if ( this._dataSource === "none" ) {
        return;
      }
      if ( this._dataSource === "model" ) {
        this.model.on("change", this.render);
      } else {
        this.collection.on("reset", this.render);
        this.collection.on("add", this.render);
        // this.collection.on("change", this.render);
      }
    },

    additionalEventListening: function() {
    },

    renderLoader: function() {
      $("body").addClass("loading");
      return this;
    },

    navigate: function(router, event) {
      event.preventDefault();
      var element = $(event.target).closest("a");

      router.navigate(element.attr("href"), true);
    },

    template: function() {
      return HandlebarsTemplates[this.templateName](this.templateJSON());
    },

    addViews: function() {
    },

    close: function() {
      this.off();
      this.undelegateEvents();
    }

  });

  function loadingTemplate() {
    // return HandlebarsTemplates["shared/_loading"](this.templateJSON());
  }

  return public_;

})($, Scratcher);






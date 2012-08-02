Scratcher = (function ($, public_) {

  public_.ListController = Backbone.View.extend({
    shouldFetch:        true, // or false
    shouldRenderLoader: true, // or false
    shouldRender:       true, // or false
    _dataSource:        "collection", // or "model" or "none"

    initialize: function() {
      _.bindAll(this, "render", "renderLoader");
      this.shouldFetch        = this.options.shouldFetch || this.shouldFetch;
      this.shouldRender       = this.options.shoulRender || this.shouldRender;
      this.shouldRenderLoader = this.options.shouldRenderLoader || this.shouldRenderLoader;
      this._dataSource        = this.options._dataSource || this._dataSource;

      this.setDataSourceEventListening();
      this.additionalEventListening();
    },

    render: function() {
      if ( this.dataSource().isPopulated() ) {
        this.renderList();
        $("body").removeClass("loading");
      } else {
        if ( this.shouldRenderLoader ) {
          this.renderLoader();
        }
        if ( this.shouldFetch ) {
          this.dataSource().fetch();
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
      // implement if you need extra events
    },

    renderLoader: function() {
      $("body").addClass("loading");
      return this;
    },

    navigate: function(event) {
      var element = $(event.target).closest("a");

      window.App.navigate(element.attr("href"), true);
      if (window.pushStateAvailable) {
        event.preventDefault();
      }
    },

    close: function() {
      this.off();
      this.undelegateEvents();
    }

  });

  return public_;

})($, Scratcher);





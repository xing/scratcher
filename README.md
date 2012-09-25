scratcher
=========

Backbone lightweight framework giving simple structure to make life a little easier

=========

Why Scratcher?

  Scratcher attempts to address a couple patterns that arise when building Backbone apps.

=========

1. "populated"

  Models/Collections can benefit with an attribute that tells you if fetch has been called and returned already.
  Many more complex apps would replace this with some sort of stale concept. But, for most cases populated should be enough.

2. View

  This is the major addition. First off it attempts to give options, that for many simple cases would allow a view to be only a few lines of code.
  Options:
    templateName: the location and name of the template,
    shouldFetch:  boolean of whether the view should call fetch on the model/collection,
    shouldRenderLoader: boolean of whether to show a loader if the data is fetching,
    shouldRender: boolean of whether to render (yes there are some views that have all DOM elements already in place),
    dataType: "model", "collection" or "none"
    defaultEvents: boolean of whether to setup the event listeners for model or collection

  We also provide 3 callbacks: afterInitialize, addViews and afterRender.
  "addViews" is intended to allow subViews to be added to a view.

  Additional items of interest:
  "close" ensures the view has it's events properly undelegated. This prevents double/tripe click problems that can occure when re-rendering views.

  "navigate" is a handy method for adding click behavior to a tags.

3. Router

  The biggest feature here is the display method. This is intended to be called at the end of each router "action." It makes sure the main view is properly closed and stores a reference to the new current view.


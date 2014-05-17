window.Trellito = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $rootEl = $('#content');
    this.boards = new Trellito.Collections.Boards();

    new Trellito.Routers.AppRouter({
      boards: this.boards,
      $rootEl: $rootEl
    });
    Backbone.history.start();
  }
};


$(document).ready(function(){
  Trellito.initialize();
});


Backbone.CompositeView = Backbone.View.extend({
  subviews: function(selector) {
    this._subviews = this._subviews || {}

    if(!selector) {
      return this._subviews
    }

    if(!this._subviews[selector]) {
      this._subviews[selector] = [];
    }

    return this._subviews[selector];
  },

  addSubview: function(selector, subview) {
    this.subviews(selector).push(subview);
    this.attachSubview(selector, subview);
  },

  attachSubview: function(selector, subview) {
    this.$(selector).append(subview.render().el);
  },

  attachSubviews: function() {
    var view = this;
    _.each(this.subviews(), function(subviews, selector) {
      view.$(selector).empty();

      _.each(subviews, function(subview){
        view.attachSubview(selector, subview);
        subview.delegateEvents();
      })
    })
  }
})


window.Trellito = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $rootEl = $('#content');
    this.boards = new Trellito.Collections.Boards();

    this.router = new Trellito.Routers.AppRouter({
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
    } else {
      this._subviews[selector] = this._subviews[selector] || []
      return this._subviews[selector];
    }
  },

  addSubview: function(selector, subview) {
    this.subviews(selector).push(subview);
    this.attachSubview(selector, subview);
  },

  attachSubview: function(selector, subview) {
    this.$(selector).append(subview.render().el);
    subview.delegateEvents();
  },

  attachSubviews: function() {
    var view = this;
    _.each(this.subviews(), function(subviews, selector) {
      view.$(selector).empty();
      _.each(subviews, function(subview){
        view.attachSubview(selector, subview);
      })
    })
  },
  remove: function() {
    Backbone.View.prototype.remove.call(this);
    var view = this;
    _.each(this.subviews(), function(subviews, selector) {
      _.each(subviews, function(subview) {
        subview.remove();
      })
    })
  }
})


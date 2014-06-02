window.Trellito.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    '' : 'index',
    'boards/:id' : 'show'

  },

  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    this.boards = options.boards;
  },

  index: function() {
    this.boards.fetch();
    var boardsIndexView = new Trellito.Views.BoardsIndexView({
      collection: this.boards
    });

    this._swapView(boardsIndexView);
  },

  show: function(id) {
    var board = this.boards.getOrFetch(id);
    var boardShowView = new Trellito.Views.BoardShowView({
      model: board,
      collection: board.lists()
    });

    this._swapView(boardShowView);
  },

  _swapView: function(view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.render().el);
  }
})
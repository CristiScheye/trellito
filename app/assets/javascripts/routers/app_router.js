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

    var newBoardView = new Trellito.Views.NewBoardView();

    this._swapView(boardsIndexView);
    this.$rootEl.append(newBoardView.render().el)
  },

  show: function(id) {
    var board = this.boards.getOrFetch(id);
    var boardShowView = new Trellito.Views.BoardShowView({
      model: board
    });

    this._swapView(boardShowView);
  },

  _swapView: function(view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.render().el);
  }
})
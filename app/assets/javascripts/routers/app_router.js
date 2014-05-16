window.Trellito.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    '' : 'boardsIndex'
  },

  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    this.boards = options.boards;
  },

  boardsIndex: function() {
    this.boards.fetch();
    var boardsIndexView = new Trellito.Views.BoardsIndexView({
      collection: this.boards
    });

    var newBoardView = new Trellito.Views.NewBoardView();

    this.$rootEl.html(boardsIndexView.render().el);
    this.$rootEl.append(newBoardView.render().el)
  }
})
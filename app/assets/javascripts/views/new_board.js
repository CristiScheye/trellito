window.Trellito.Views.NewBoardView = Backbone.View.extend({
  template: JST['boards/new'],
  render: function() {
    var content = this.template();

    this.$el.html(content);
    return this;
  },
  events: {
    'submit form#new-board' : 'submit'
  },
  submit: function(event) {
    var view = this;
    event.preventDefault();
    var boardArrs = $(event.target).serializeJSON()['board'];
    var board = new Trellito.Models.Board(boardArrs)
    board.save({},{
      success: function() {
        Trellito.boards.add(board);
        view.render();
      }
    })
  }
})
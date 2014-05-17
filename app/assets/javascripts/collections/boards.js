window.Trellito.Collections.Boards = Backbone.Collection.extend({
  url: '/api/boards',
  model: Trellito.Models.Board,
  getOrFetch: function(id) {
    var board = this.get(id);

    if(!board) {
      board = new Trellito.Models.Board({ 'id' : id })
      board.fetch();
      this.add(board);
    }

    return board;
  }
})
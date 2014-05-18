window.Trellito.Collections.BoardLists = Backbone.Collection.extend({
  model: Trellito.Models.List,
  url: function() {
    return this.board.url() + '/lists';
  },
  initialize: function(arr, options) {
    this.board = options.board;
  }
})
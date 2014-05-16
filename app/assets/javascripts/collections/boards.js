window.Trellito.Collections.Boards = Backbone.Collection.extend({
  url: '/api/boards',
  model: Trellito.Models.Board
})
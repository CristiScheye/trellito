window.Trellito.Collections.BoardMembers = Backbone.Collection.extend({
  model: Trellito.Models.User,
  initialize: function(options) {
    this.board = options.board;
  }
})
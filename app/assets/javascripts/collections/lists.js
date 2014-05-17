window.Trellito.Collections.Lists = Backbone.Collection.extend({
  model: Trellito.Models.List,
  url: function() {
    return this.board.url() + '/lists';
  },

  initialize: function(arr, options) {
    this.board = options.board;
  },

  getOrFetch: function(id) {
    var list = this.get(id)

    if(!list) {
      list = new Trellito.Models.List({ 'id' : id });
      list.fetch()
      this.add(list);
    }

    return list;
  },
})
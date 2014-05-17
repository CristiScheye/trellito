window.Trellito.Models.Board = Backbone.Model.extend({
  urlRoot: '/api/boards',
  lists: function() {
    this._lists = this._lists || new Trellito.Collections.Lists([], {
      board: this
    });
    return this._lists;
  },
  parse: function(res) {
    this.lists().add(res['lists'])
    delete res['lists']
    return res
  }
});
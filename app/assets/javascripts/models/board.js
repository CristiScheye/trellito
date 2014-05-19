window.Trellito.Models.Board = Backbone.Model.extend({
  urlRoot: '/api/boards',
  lists: function() {
    this._lists = this._lists || new Trellito.Collections.BoardLists([], {
      board: this
    });
    return this._lists;
  },

  members: function() {
    this._members = this._members || new Trellito.Collections.BoardMembers([], {
      board: this
    });
    return this._members;
  },

  parse: function(res) {
    this.lists().set(res['lists']);
    delete res['lists'];

    this.members().set(res['members']);
    delete res['members'];

    return res;
  }
});
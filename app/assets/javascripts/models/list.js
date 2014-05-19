window.Trellito.Models.List = Backbone.Model.extend({
  cards: function() {
    this._cards = this._cards || new Trellito.Collections.ListCards([], {
      list: this
    });

    return this._cards;
  },

  parse: function(res) {
    this.cards().set(res['cards']);
    delete res['cards'];

    return res;
  }
});
window.Trellito.Views.NewCardView = Backbone.View.extend({
  template: JST['cards/new'],
  initialize: function(options) {
    this.list = options.list;
  },
  render: function() {
    var content = this.template({
      list_id: this.list.id
    });
    this.$el.html(content);
    return this;
  },

  events: {
    'submit form#new-list-card' : 'addCard'
  },

  addCard: function(event) {
    event.preventDefault();
    var cardAttrs = $(event.target).serializeJSON()['card'];
    cardAttrs.rank = this.list.cards().length + 1;
    this.list.cards().create(cardAttrs);
  }
})
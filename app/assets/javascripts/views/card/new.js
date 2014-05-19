window.Trellito.Views.NewCardView = Backbone.View.extend({
  template: JST['cards/new'],
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

  initialize: function(options) {
    this.list = options.list;
  },

  addCard: function(event) {
    event.preventDefault();
    var view = this;
    var cardAttrs = $(event.target).serializeJSON()['card'];
    this.list.cards().create(cardAttrs, {
      success: function() {
        view.render();
      },
      wait: true
    })
  }
})
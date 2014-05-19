window.Trellito.Views.BoardListView = Backbone.CompositeView.extend({
  template: JST['boards/_list'],

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.cards(), 'add', this.addCard);

    this.model.cards().each(function(card) {
      this.addCard(card);
    }.bind(this))

    var newCardView = new Trellito.Views.NewCardView({
      list: this.model
    });
    this.addSubview('#new-card', newCardView)
  },

  addCard: function(card) {
    var cardView = new Trellito.Views.ListCardView({
      model: card
    })
    this.addSubview('#cards', cardView);
  },

  render: function() {
    var content = this.template({
      list: this.model
    })

    this.$el.html(content);
    this.attachSubviews();

    return this;
  }
})
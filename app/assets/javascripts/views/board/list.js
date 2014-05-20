window.Trellito.Views.BoardListView = Backbone.CompositeView.extend({
  template: JST['boards/_list'],

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.cards(), 'add', this.addSortedCards);

    this.model.cards().each(function(card) {
      this.addCard(card);
    }.bind(this))

    var newCardView = new Trellito.Views.NewCardView({
      list: this.model
    });
    this.addSubview('#new-card', newCardView)
  },

  events: {
    'click .remove-list' : 'removeList'
  },

  removeList: function(event) {
    debugger;
    // var list_id = $(event.target).attr('data-id');
    // var list = this.model.destroy({'id' : list_id});
    var boardLists = this.model.collection;
    boardLists.remove(this.model);
  },

  addCard: function(card) {
    var cardView = new Trellito.Views.ListCardView({
      model: card
    })
    this.addSubview('#cards', cardView);
  },

  addSortedCards: function(){
    this.removeSubviews('#cards');
    this.model.cards().each(function(card) {
      this.addCard(card);
    }.bind(this))
  },

  render: function() {
    var content = this.template({
      list: this.model
    })

    this.$el.html(content);
    this.attachSubviews();

    $(function() {
      $('div#cards').sortable({
        items: '.card',
        connectWith: 'div#cards'
      });
      $('div#cards').disableSelection();
    })

    return this;
  }
})
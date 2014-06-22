window.Trellito.Views.BoardListView = Backbone.CompositeView.extend({
  template: JST['boards/_list'],

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.cards(), 'sync', this.render);
    this.listenTo(this.model.cards(), 'remove', this.render);
  },

  events: {
    'click .remove-list' : 'removeList',
    'click .add-card' : 'displayCardForm',
    'click .remove-card' : 'removeCard'
  },

  displayCardForm: function () {
    if (this.subviews('#new-card-' + this.model.id).length === 0){
      var newCardView = new Trellito.Views.NewCardView({
        list: this.model
      });
      this.addSubview('#new-card-' + this.model.id, newCardView)
      $('#add-card-'+ this.model.id).html('Done')
    } else {
      this.removeSubviews('#new-card-' + this.model.id);
      $('#add-card-' + this.model.id).html('+ New Card')
    }
  },

  addCardText: function() {
    if (this.subviews('#new-card-' + this.model.id).length === 0) {
      return '+ New Card';
    } else {
      return 'Done';
    }
  },

  removeList: function(event) {
    this.model.destroy();
  },

  removeCard: function (event) {
    var cardId = $(event.target).attr('data-id');
    var card = this.model.cards().get(cardId);
    card.destroy();
  },

  render: function() {
    var content = this.template({
      list: this.model,
      cards: this.model.cards(),
      buttonText: this.addCardText()
    })

    this.$el.html(content);
    this.attachSubviews();

    $(function() {
      $('.cards').sortable({
        items: '.card',
        connectWith: '.cards'
      });
      $('.cards').disableSelection();
    })

    return this;
  }
})
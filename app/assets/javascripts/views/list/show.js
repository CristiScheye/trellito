window.Trellito.Views.BoardListView = Backbone.CompositeView.extend({
  template: JST['boards/_list'],

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.cards(), 'sync', this.render);
  },

  events: {
    'click .remove-list' : 'removeList',
    'click #add-card' : 'displayCardForm'
  },

  displayCardForm: function () {
    if (this.subviews('#new-card').length === 0){
      var newCardView = new Trellito.Views.NewCardView({
        list: this.model
      });
      this.addSubview('#new-card', newCardView)
    }
  },

  removeList: function(event) {
    this.model.destroy();
  },

  render: function() {
    var content = this.template({
      list: this.model,
      cards: this.model.cards()
    })

    this.$el.html(content);
    this.attachSubviews();

    $(function() {
      $('ul.cards').sortable({
        items: 'li.card',
        connectWith: 'ul.cards'
      });
      $('ul.cards').disableSelection();
    })

    return this;
  }
})
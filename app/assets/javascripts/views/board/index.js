window.Trellito.Views.BoardsIndexView = Backbone.View.extend({
  template: JST['boards/index'],
  render: function() {
    var content = this.template({
      boards: this.collection
    });

    this.$el.html(content);
    return this;
  },
  initialize: function() {
    this.listenTo(this.collection, 'sync add', this.render);
  },

  events: {
    'click button#new-board' : 'showNewBoardForm'
  },

  showNewBoardForm: function() {
    $('#new-board-modal').modal();
  }
})
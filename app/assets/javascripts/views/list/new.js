window.Trellito.Views.NewListView = Backbone.View.extend({
  template: JST['lists/new'],
  render: function() {
    var content = this.template({
      board_id: this.board.get('id')
    });
    this.$el.html(content);
    return this;
  },
  events: {
    'submit #new-board-list' : 'submit'
  },
  initialize: function(options) {
    this.board = options.board
  },
  submit: function(event) {
    event.preventDefault();

    var view = this;
    var listAttrs = $(event.target).serializeJSON()['list']
    this.board.lists().create(listAttrs, {
      success: function() {
        view.hideModal('#new-list-modal');
        view.render();
      },
      wait: true
    })
  }
});
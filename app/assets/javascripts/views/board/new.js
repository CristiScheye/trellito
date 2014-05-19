window.Trellito.Views.NewBoardView = Backbone.View.extend({
  template: JST['boards/new'],
  render: function() {
    var content = this.template();

    this.$el.html(content);
    return this;
  },
  events: {
    'submit form#new-board' : 'submit'
  },
  submit: function(event) {
    event.preventDefault();
    var boardArrs = $(event.target).serializeJSON()['board'];

    Trellito.boards.create(boardArrs, {
      success: function(res) {
        view.hideModal('#new-board-modal')

        Trellito.router.navigate('/boards/' + res.get('id'), {
          trigger: true
        });
      },
      wait: true
    });
  }
});
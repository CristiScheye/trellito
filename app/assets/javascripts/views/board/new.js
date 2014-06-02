window.Trellito.Views.NewBoardView = Backbone.View.extend({
  template: JST['boards/new'],
  render: function() {
    var content = this.template();

    this.$el.html(content);
    return this;
  },

  events: {
    'submit form#new-board' : 'submit',
  },

  submit: function(event) {
    var view = this;
    event.preventDefault();
    var boardAttrs = $(event.target).serializeJSON()['board'];
    Trellito.boards.create(boardAttrs, {
      success: function(resp) {
        Trellito.router.navigate('boards/' + resp.id, {trigger: true})
      },
      wait: true
    });
  }
});
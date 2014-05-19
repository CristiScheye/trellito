window.Trellito.Views.NewMemberView = Backbone.View.extend({
  template: JST['users/new'],
  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  },
  events: {
    'submit #new-board-member': 'handleAddMember'
  },
  initialize: function(options) {
    this.board = options.board
  },
  handleAddMember: function(event) {
    event.preventDefault();
    var view = this;

    var data = $(event.target).serializeJSON();
    data.board = this.board.toJSON();
    this.board.save(data, {
      success: function() {
        view.hideModal('#new-member-modal');
      }
    });
  }
})
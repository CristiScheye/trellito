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
  handleAddMember: function(event) {
    event.preventDefault();
    var data = $(event.target).serializeJSON();
    data.board = this.model.toJSON();
    this.model.save(data);
  }
})
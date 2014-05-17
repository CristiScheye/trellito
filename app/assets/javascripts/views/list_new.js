window.Trellito.Views.NewListView = Backbone.View.extend({
  template: JST['lists/new'],
  render: function() {
    var content = this.template({
      board_id: this.model.get('id')
    });
    this.$el.html(content);
    return this;
  },
  events: {
    'submit #new-list' : 'submit'
  },
  submit: function(event) {
    event.preventDefault();
    var listAttrs = $(event.target).serializeJSON()['list']
    this.model.lists().create(listAttrs, {
      success: function() {
        alert("made the list!");
      },
      wait: true
    })
  }
});
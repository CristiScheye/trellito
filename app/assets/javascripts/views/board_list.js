window.Trellito.Views.BoardListView = Backbone.View.extend({
  template: JST['boards/list_show'],
  render: function() {
    var content = this.template({
      list: this.model
    })
    this.$el.html(content);
    return this;
  }
})
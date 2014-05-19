window.Trellito.Views.BoardMemberView = Backbone.View.extend({
  template: JST['boards/_member'],
  render: function() {
    var content = this.template({
      member: this.model
    });
    this.$el.html(content);
    return this;
  }
})
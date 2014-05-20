window.Trellito.Views.ListCardView = Backbone.View.extend({
  template: JST['lists/_card'],
  className: 'card',
  render: function() {
    var content = this.template({
      card: this.model
    });
    this.$el.html(content);

    return this;
  }
})
window.Trellito.Models.Card = Backbone.Model.extend({
  initialize: function(options) {
    this.list = options.list;
  }
});
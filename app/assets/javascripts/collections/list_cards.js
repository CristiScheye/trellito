window.Trellito.Collections.ListCards = Backbone.Collection.extend({
  model: Trellito.Models.Card,
  url: function(){
    return this.list.url() + '/cards';
  },

  initialize: function(options) {
    this.list = options.list;
  }
})
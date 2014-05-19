window.Trellito.Collections.ListCards = Backbone.Collection.extend({
  model: Trellito.Models.Card,
  url: function(){
    return 'api/lists/' + this.list.id + '/cards';
  },

  initialize: function(arr, options) {
    this.list = options.list;
  }
})
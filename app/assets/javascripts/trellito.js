window.Trellito = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $rootEl = $('#content');
    this.boards = new Trellito.Collections.Boards();

    new Trellito.Routers.AppRouter({
      boards: this.boards,
      $rootEl: $rootEl
    });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Trellito.initialize();
});

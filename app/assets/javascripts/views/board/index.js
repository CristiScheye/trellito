window.Trellito.Views.BoardsIndexView = Backbone.CompositeView.extend({
  template: JST['boards/index'],

  render: function() {
    var content = this.template({
      boards: this.collection
    });

    this.$el.html(content);
    this.attachSubviews();

    $(function(){
      $('#boards').disableSelection();
      $('#boards').sortable({
        items: '.board'
      });
    })
    return this;
  },

  initialize: function() {
    this.listenTo(this.collection, 'sync add', this.render);
  },

  events: {
    'click #new-board' : 'addNewBoard'
  },

  addNewBoard: function () {
    if (this.subviews('#new-board-form').length === 0) {
      var newBoard = new Trellito.Views.NewBoardView();
      this.addSubview('#new-board-form', newBoard);
    }
  }
})
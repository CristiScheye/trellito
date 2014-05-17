window.Trellito.Views.BoardShowView = Backbone.CompositeView.extend({
  template: JST['boards/show'],

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.lists(), 'add', this.addList);
    this.listenTo(this.model.lists(), 'remove', this.render);

    var newListView = new Trellito.Views.NewListView({
      model: this.model
    });
    this.addSubview('#new-list', newListView);

    this.model.lists().each(function(list) {
      this.addList(list)
    }.bind(this))
  },

  addList: function(list) {
    var boardListView = new Trellito.Views.BoardListView({
      model: list
    });
    this.addSubview('#board-list', boardListView);
  },

  render: function() {
    var content = this.template({
      board: this.model
    })

    this.$el.html(content);
    this.attachSubviews();

    return this;
  }

})
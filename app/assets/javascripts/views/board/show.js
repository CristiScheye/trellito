window.Trellito.Views.BoardShowView = Backbone.CompositeView.extend({
  template: JST['boards/show'],

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.lists(), 'add', this.addSortedLists);
    this.listenTo(this.model.members(), 'add', this.render);
    this.listenTo(this.model.lists(), 'remove', this.removeList);

    /*lists*/
    this.model.lists().each(function(list) {
      this.addList(list);
    }.bind(this));

    var newListView = new Trellito.Views.NewListView({
      board: this.model,
    });
    this.addSubview('#new-board-list', newListView);

    // members
    var membersView = new Trellito.Views.MembersIndexView({
      collection: this.model.members(),
      board: this.model
    });
    this.addSubview('#board-members', membersView);
  },


  events: {
    'click #show-new-list-form' : 'showNewListForm',
  },

  showNewListForm: function() {
    $('#new-list-modal').modal();
  },

  addList: function(list) {
    var boardListView = new Trellito.Views.BoardListView({
      model: list,
      collection: this.model.lists()
    });
    this.addSubview('#board-lists', boardListView);
  },

  removeList: function(list) {
    this.removeSubview('#board-lists', list);
    this.attachSubviews();
  },

  addSortedLists: function() {
    this.removeSubviews('#board-lists');
    this.model.lists().each(function(list) {
      this.addList(list);
    }.bind(this))
  },

  render: function() {
    var content = this.template({
      board: this.model
    })

    this.$el.html(content);
    this.attachSubviews();


    $(function() {
      $('div#board-lists').sortable({
        items: '.list-item'
      });
      $('div#board-lists').disableSelection();
    })

    return this;
  }

})
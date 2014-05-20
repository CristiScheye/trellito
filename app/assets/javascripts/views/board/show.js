window.Trellito.Views.BoardShowView = Backbone.CompositeView.extend({
  template: JST['boards/show'],

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.lists(), 'add', this.addSortedLists);
    this.listenTo(this.model.members(), 'add', this.addMember);
    this.listenTo(this.model.lists(), 'remove', this.removeList);

    /*lists*/
    this.model.lists().each(function(list) {
      this.addList(list);
    }.bind(this));

    var newListView = new Trellito.Views.NewListView({
      board: this.model,
    });
    this.addSubview('#new-board-list', newListView);

    /*members*/
    this.model.members().each(function(member) {
      this.addMember(member);
    }.bind(this));

    var newMemberView = new Trellito.Views.NewMemberView({
      board: this.model
    });
    this.addSubview('#new-board-member', newMemberView);
  },


  events: {
    'click button#show-new-member-form' : 'showNewMemberForm',
    'click button#show-new-list-form' : 'showNewListForm',
  },

  showNewListForm: function() {
    $('#new-list-modal').modal();
  },

  showNewMemberForm: function() {
    $('#new-member-modal').modal();
  },

  addList: function(list) {
    var boardListView = new Trellito.Views.BoardListView({
      model: list,
      collection: this.model.lists()
    });
    this.addSubview('#board-lists', boardListView);
  },

  removeList: function(list) {
    debugger;
    this.removeSubview('#board-lists', list);
    this.attachSubviews();
  },

  addSortedLists: function() {
    this.removeSubviews('#board-lists');
    this.model.lists().each(function(list) {
      this.addList(list);
    }.bind(this))
  },

  addMember: function(member) {
    var boardMemberView = new Trellito.Views.BoardMemberView({
      model: member
    });
    this.addSubview('#board-members', boardMemberView);
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
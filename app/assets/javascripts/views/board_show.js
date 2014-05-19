window.Trellito.Views.BoardShowView = Backbone.CompositeView.extend({
  template: JST['boards/show'],

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.lists(), 'add', this.addList);
    this.listenTo(this.model.members(), 'add', this.addMember);

    this.model.lists().each(function(list) {
      this.addList(list);
    }.bind(this));

    var newListView = new Trellito.Views.NewListView({
      board: this.model
    });
    this.addSubview('#new-board-list', newListView);


    this.model.members().each(function(member) {
      this.addList(member);
    }.bind(this));

    var newMemberView = new Trellito.Views.NewMemberView({
      board: this.model
    });
    this.addSubview('#new-board-member', newMemberView);
  },

  addList: function(list) {
    var boardListView = new Trellito.Views.BoardListView({
      model: list
    });
    this.addSubview('#board-lists', boardListView);
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

    debugger;

    this.$el.html(content);
    this.attachSubviews();

    return this;
  }

})
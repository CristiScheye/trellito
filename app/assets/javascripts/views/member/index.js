window.Trellito.Views.MembersIndexView = Backbone.View.extend({
  template: JST['boards/members'],
  initialize: function (options) {
    this.board = options.board;
    this.listenTo(this.collection, 'remove', this.render);
    this.listenTo(this.collection, 'add', this.render);
  },
  events: {
    'mouseenter .remove-member' : 'displayRemoveButton',
    'mouseleave .remove-member' : 'hideRemoveButton',
    'click .remove-member' : 'removeMember',
    'click #show-new-member-form' : 'showNewMemberForm',
    'submit #new-board-member' : 'addMember'
  },
  render: function () {
    var content = this.template({
      members: this.collection
    });
    this.$el.html(content);
    return this;
  },
  addMember: function (event) {
    event.preventDefault();
    var formAttrs = $(event.target).serializeJSON();
    this.board.save(formAttrs, {
      success: function (model) {
        $('#new-member-modal').modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
      }
    });
  },
  // displayRemoveButton: function (event) {
  //   var btn = $(event.target)
  //   btn.addClass('btn btn-danger btn-xs')
  //   btn.html("Remove")
  // },
  // hideRemoveButton: function (event) {
  //   var btn = $(event.target)
  //   btn.removeClass('btn btn-danger btn-xs')
  //   btn.html("&times");
  // },
  // removeMember: function (event) {
  //   var memberId = $(event.target).attr('data-id')
  //   // needs to get list of board member ids, remove this one
  //   this.board.members().remove(memberId);
  //   this.board.save();
  // },
  showNewMemberForm: function() {
    $('#new-member-modal').modal();
  },
})
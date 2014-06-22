window.Trellito.Models.Card = Backbone.Model.extend({
  initialize: function(options) {
    this.list = options.list;
  },

  validate: function(cardAttrs) {
    var errors = [];
    if (cardAttrs.list_id === '') {
      errors.push('Must belong to a list.');
    } else if (cardAttrs.description === '') {
      errors.push('Must have a description');
    } else if (cardAttrs.rank === '') {
      errors.push('Must have a rank');
    }
    if (errors.length > 0) {
      return errors;
    }
  }
});
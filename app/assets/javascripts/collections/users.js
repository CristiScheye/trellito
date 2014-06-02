window.Trellito.Collections.Users = Backbone.Collection.extend({
  model: Trellito.Models.User,
  url: '/api/users'
})
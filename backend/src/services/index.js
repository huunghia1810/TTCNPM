const users = require('./users/users.service.js')
const userRoles = require('./user-roles/user-roles.service.js')
const orders = require('./orders/orders.service.js');
const menu = require('./menu/menu.service.js');
const identity = require('./identity/identity.service.js');
const ratings = require('./ratings/ratings.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users)
  app.configure(userRoles)
  app.configure(orders);
  app.configure(menu);
  app.configure(identity);
  app.configure(ratings);
}

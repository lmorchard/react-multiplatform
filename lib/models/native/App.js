var BaseAppState = require('../App');
var TodoCollection = require('./TodoCollection');

module.exports = BaseAppState.extend({
  collections: {
    todos: TodoCollection
  }
});

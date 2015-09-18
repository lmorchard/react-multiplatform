var React = require('react-native');

var Views = require('../index');
var styles = require('./styles');
var TodoItem = require('./TodoItem');

var TodoList = module.exports = React.createClass({
  styles: styles,
  mixins: [
    Views.TodoListCommonMixin,
    Views.TodoListNativeCommonMixin
  ],
  renderRow(item) {
    return (<TodoItem key={item.cid} item={item} />);
  }
});

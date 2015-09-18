var React = require('react-native');

var CommonMixins = require('../common-mixins');
var NativeMixins = require('../native-mixins');

var styles = require('./styles');
var TodoItem = require('./TodoItem');

var TodoList = module.exports = React.createClass({
  styles: styles,
  mixins: [
    CommonMixins.TodoListCommonMixin,
    NativeMixins.TodoListNativeCommonMixin
  ],
  renderRow(item) {
    return (<TodoItem key={item.cid} item={item} />);
  }
});

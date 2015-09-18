var React = require('react-native');

var { SwitchAndroid } = React;

var CommonMixins = require('../common-mixins');
var NativeMixins = require('../native-mixins');

var styles = require('./styles');

var TodoItem = module.exports = React.createClass({
  styles: styles,
  mixins: [
    CommonMixins.TodoItemCommonMixin,
    NativeMixins.TodoItemNativeCommonMixin
  ],
  renderTodoCompleted() {
    return (
      <SwitchAndroid
        style={this.styles.todoCompleted}
        onValueChange={this.handleCompletedChange}
        value={this.state.item.completed} />
    );
  }
});

var React = require('react-native');

var { SwitchIOS } = React;

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
      <SwitchIOS
        style={styles.todoCompleted}
        onValueChange={this.handleCompletedChange}
        value={this.state.item.completed} />
    );
  }
});

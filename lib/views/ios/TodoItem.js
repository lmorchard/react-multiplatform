var React = require('react-native');

var { SwitchIOS } = React;

var Views = require('../index');
var styles = require('./styles');

var TodoItem = module.exports = React.createClass({
  styles: styles,
  mixins: [
    Views.TodoItemCommonMixin,
    Views.TodoItemNativeCommonMixin
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

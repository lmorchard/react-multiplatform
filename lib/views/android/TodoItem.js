var React = require('react-native');

var { SwitchAndroid } = React;

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
      <SwitchAndroid
        style={this.styles.todoCompleted}
        onValueChange={this.handleCompletedChange}
        value={this.state.item.completed} />
    );
  }
});

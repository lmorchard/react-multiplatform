var React = require('react');

var CommonMixins = require('../common-mixins');

var styles = require('./styles');

var KEY_ENTER = 13;
var KEY_ESC = 27;

var TodoItem = module.exports = React.createClass({

  mixins: [CommonMixins.TodoItemCommonMixin],

  render() {
    var itemStyles = styles.todoListItem;

    var title = (!this.state.editing) ? (
      <span style={itemStyles.title}
        onClick={this.handleEditStart}>
        {this.state.item.title}
      </span>
    ) : (
      <span style={itemStyles.editor.container}>
        <input style={itemStyles.editor.field}
          type="text"
          ref="editField"
          autoFocus={true}
          defaultValue={this.state.item.title}
          onKeyDown={this.handleEditKeyDown} />
        <button style={itemStyles.editor.deleteButton}
          onClick={this.handleDelete}>Delete</button>
      </span>
    );

    return (
      <li style={itemStyles.container}>
        <input type="checkbox"
          style={itemStyles.completed}
          onChange={(event) => this.handleCompletedChange(event.target.checked)}
          checked={this.state.item.completed} />
        {title}
      </li>
    );

  },

  handleEditKeyDown(event) {
    switch (event.which) {
      case KEY_ENTER:
        var val = this.refs.editField.getDOMNode().value.trim();
        this.setState({ editing: false });
        this.state.item.title = val;
      case KEY_ESC:
        this.setState({ editing: false });
    }
  }

});

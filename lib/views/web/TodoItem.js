var React = require('react');
var Views = require('..');

var KEY_ENTER = 13;
var KEY_ESC = 27;

var TodoItem = module.exports = React.createClass({

  mixins: [Views.TodoItemCommonMixin],

  render() {

    var title = (!this.state.editing) ? (
      <span onClick={this.handleEditStart}>
        {this.state.item.title}
      </span>
    ) : (
      <span>
        <input type="text"
          ref="editField"
          autoFocus={true}
          defaultValue={this.state.item.title}
          onKeyDown={this.handleEditKeyDown} />
        <button onClick={this.handleDelete}>Delete</button>
      </span>
    );

    return (
      <li>
        <input type="checkbox"
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

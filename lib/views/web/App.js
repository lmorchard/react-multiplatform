var React = require('react');
var Views = require('..');

var KEY_ENTER = 13;

var TodoList = require('./TodoList');

var App = module.exports = React.createClass({

  mixins: [Views.AppCommonMixin],

  collectionClass: require('../../models/web/TodoCollection'),

  render() {
    return (
      <div>
        <h1>TODOs</h1>
        <input type="text" width="50"
          ref="newField" id="new-todo"
          placeholder="type to add a new item"
          onKeyDown={this.handleNewTodoKeyDown}
          autoFocus={true}
        />
        <TodoList collection={this.state.todos} />
      </div>
    )
  },

  handleNewTodoKeyDown(event) {

    if (event.which !== KEY_ENTER) { return; }

    var val = this.refs.newField.getDOMNode().value.trim();
    this.refs.newField.getDOMNode().value = '';

    this.state.todos.add({
      title: val,
      completed: false
    });

  }

});

var React = require('react');

var Views = require('./lib/views');

var ENTER_KEY = 13;

var TodoList = React.createClass({
  mixins: [Views.TodoListCommonMixin],
  render() {
    return (
      <ul>
        {this.state.collection.map((item) =>
          <TodoItem key={item.cid} item={item} />)}
      </ul>
    );
  },
  getInitialState() {
    return { collection: this.props.collection };
  },
  componentDidMount() {
	  this.state.collection.on('add remove', () => this.forceUpdate());
  }
});

var TodoItem = React.createClass({
  mixins: [Views.TodoItemCommonMixin],
  render() {
    return (
      <li>
        <label>
          <input type="checkbox"
            onChange={(event) => this.handleCompletedChange(event.target.checked)}
            checked={this.state.item.completed} />
          <button
            onClick={this.handleDelete}>Delete</button>
          <span>{this.state.item.title}</span>
        </label>
      </li>
    );
  }
});

var App = React.createClass({
  mixins: [Views.AppCommonMixin],
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
    if (event.which !== ENTER_KEY) { return; }
    var val = this.refs.newField.getDOMNode().value.trim();
    this.refs.newField.getDOMNode().value = '';
    this.state.todos.add({
      title: val,
      completed: false
    });
    return false;
  }
});

React.render(<App />, document.getElementById('app'));

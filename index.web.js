var React = require('react');

var Views = require('./lib/views');

var KEY_ENTER = 13;
var KEY_ESC = 27;

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
    var title = (!this.state.editing) ? (
      <span onClick={this.handleEditStart}>
        {this.state.item.title}
      </span>
    ) : (
      <span>
        <button onClick={this.handleDelete}>Delete</button>
        <input type="text"
          ref="editField"
          autoFocus={true}
          defaultValue={this.state.item.title}
          onKeyDown={this.handleEditKeyDown} />
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
    if (event.which !== KEY_ENTER) { return; }
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

var React = require('react');

var Views = require('./lib/views');

var TodosCollection = new (require('./lib/models/todos'))();

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
  render() {
    return (
      <div>
        <h1>TODOs</h1>
        <TodoList collection={TodosCollection} />
      </div>
    )
  }
});

React.render(<App />, document.getElementById('app'));

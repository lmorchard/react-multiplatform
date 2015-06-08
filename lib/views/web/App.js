var React = require('react');
var Views = require('..');

var KEY_ENTER = 13;

var TodoList = require('./TodoList');

var App = module.exports = React.createClass({

  mixins: [Views.AppCommonMixin],

  appStateClass: require('../../models/web/App'),

  render() {
    return (
      <div>

        <h1>TODO LIST</h1>

        <input type="text"
          style={{ width: "50em" }}
          ref="newField" id="new-todo"
          placeholder="type to add a new item"
          onKeyDown={this.handleNewTodoKeyDown}
          autoFocus={true} />

        <div>
          <button onClick={()=>this.setListMode('all')}>
            <span>All ({this.state.app.totalCount})</span>
          </button>
          <button onClick={()=>this.setListMode('active')}>
            <span>Active ({this.state.app.activeCount})</span>
          </button>
          <button onClick={()=>this.setListMode('completed')}>
            <span>Completed ({this.state.app.completedCount})</span>
          </button>
        </div>

        <TodoList collection={this.state.app.todos.subset} />

      </div>
    )
  },

  handleNewTodoKeyDown(event) {

    if (event.which !== KEY_ENTER) { return; }

    var val = this.refs.newField.getDOMNode().value.trim();
    this.refs.newField.getDOMNode().value = '';

    this.state.app.todos.add({
      title: val,
      completed: false
    });

  }

});

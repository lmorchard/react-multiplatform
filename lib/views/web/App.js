var React = require('react');

var _ = require('lodash');

var Views = require('..');
var TodoList = require('./TodoList');
var styles = require('./styles');

var KEY_ENTER = 13;

var App = module.exports = React.createClass({

  mixins: [Views.AppCommonMixin],

  appStateClass: require('../../models/web/App'),

  render() {

    var listModeButtons = Views.LIST_MODES.map((item) => {

      // Produce merged set of conditional styles for button state based on
      // current filter mode.
      // TODO: Thought React supported lists of inline styles? Doesn't work.
      var buttonStyles = _.assign({},
        styles.todoListFilters.button,
        (this.state.app.mode == item.mode) ?
          styles.todoListFilters.buttonSelected : {}
      );

      return (
        <button style={buttonStyles}
            onClick={()=>this.setListMode(item.mode)}>
          <span>{item.label.replace('%s', this.state.app[item.state])}</span>
        </button>
      )
    });

    return (
      <div style={styles.appContainer}>

        <h1 style={styles.appTitle}>TODO LIST</h1>

        <input type="text"
          style={styles.todoNewField}
          ref="newField" id="new-todo"
          placeholder="type to add a new item"
          onKeyDown={this.handleNewTodoKeyDown}
          />

        <div style={styles.todoListFilters.container}>
          {listModeButtons}
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

var React = require('react');

var CommonMixins = require('../common-mixins');

var TodoItem = require('./TodoItem');
var styles = require('./styles');

var TodoList = module.exports = React.createClass({

  mixins: [CommonMixins.TodoListCommonMixin],

  render() {
    return (
      <ul style={styles.todoList}>
        {this.state.collection.map((item) =>
          <TodoItem key={item.cid} item={item} />)}
      </ul>
    );
  },

  getInitialState() {
    return { collection: this.props.collection };
  },

  componentDidMount() {
	  this.state.collection.on('change add remove', () => this.forceUpdate(), this);
  }

});

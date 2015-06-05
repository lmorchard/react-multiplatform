var React = require('react');
var Views = require('..');

var TodoItem = require('./TodoItem');

var TodoList = module.exports = React.createClass({

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

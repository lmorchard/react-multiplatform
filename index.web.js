var React = require('react');

var TodosCollection = new (require('./lib/models/todos'))();

var TodoList = React.createClass({
  render() {
    var items = this.state.collection.map((item) => {
      return ( <TodoItem item={item} />);
    });
    return ( <ul>{items}</ul>);
  },
  getInitialState() {
    return { collection: this.props.collection };
  },
  componentDidMount() {
	  this.state.collection.on('add remove change', () => this.forceUpdate());
  },
  componentWillUnmount() {
	  this.state.collection.off(null, null, this);
  }
});

var TodoItem = React.createClass({
  render() {
    return (
      <li>{this.state.item.title} - {this.state.item.completed ? 'true' : 'false'}</li>
    );
  },
  getInitialState() {
    return { item: this.props.item };
  },
  componentWillReceiveProps(props) {
    this.setState({ item: props.item });
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

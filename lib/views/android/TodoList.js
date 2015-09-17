var React = require('react-native');

var { ListView } = React;

var Views = require('../index');
var styles = require('./styles');
var TodoItem = require('./TodoItem');

var TodoList = module.exports = React.createClass({

  mixins: [Views.TodoListCommonMixin],

  render() {
    return (
      <ListView
        style={styles.todoList}
        dataSource={this.state.dataSource}
        renderRow={(item) =>
          <TodoItem key={item.cid} item={item} />}
      />
    );
  },

  getInitialState() {
    return {
      collection: this.props.collection,
      dataSource: new React.ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };
  },

  componentDidMount() {
    // TODO: Should this happen in getInitialState instead?
    this.setState({ dataSource: this.updateDataSource() });

    this.state.collection.on('change add remove', () => {
      this.setState({ dataSource: this.updateDataSource() });
    }, this);
  },

  updateDataSource() {
    // NOTE: The DataSource retains a reference to the previous model list in
    // order to diff it against new lists to detect changes. So, we have to
    // make a fresh clone of the list, every time.
    // TODO: Is there a better way to do this?
    var rows = this.state.collection.map((model) => model);
    return this.state.dataSource.cloneWithRows(rows);
  }

});

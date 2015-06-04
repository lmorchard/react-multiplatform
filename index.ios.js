'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  SwitchIOS,
  TouchableHighlight,
} = React;

var _ = require('lodash');

var Views = require('./lib/views');

var TodosCollection = new (require('./lib/models/todos'))();

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#f5fcff'
  }
});

var TodoList = React.createClass({
  mixins: [Views.TodoListCommonMixin],

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(item) =>
          <TodoItem key={item.cid} item={item} />}
        style={styles.listView}
      />
    );
  },

  getInitialState() {
    return {
      collection: this.props.collection,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };
  },

  componentDidMount() {
    // TODO: Should this happen in getInitialState instead?
    this.setState({ dataSource: this.updateDataSource() });

    this.state.collection.on('add remove', () => {
      this.setState({ dataSource: this.updateDataSource() });
    });
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

AppRegistry.registerComponent('TodoList', () => TodoList);

var TodoItem = React.createClass({
  mixins: [Views.TodoItemCommonMixin],
  render() {
    return (
      <View style={styles.container}>
        <SwitchIOS
          onValueChange={this.handleCompletedChange}
          value={this.state.item.completed} />
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor={'red'}
          onPress={this.handleDelete}>
          <Text>Delete</Text>
        </TouchableHighlight>
        <Text>{this.state.item.title}</Text>
      </View>
    );
  }
});

AppRegistry.registerComponent('TodoItem', () => TodoItem);

var NativeApp = React.createClass({
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>TODO LIST</Text>
        <TodoList collection={TodosCollection} />
      </View>
    );
  }
});

AppRegistry.registerComponent('NativeApp', () => NativeApp);

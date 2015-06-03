'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
} = React;

var _ = require('lodash');

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

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(item) => <TodoItem item={item} />}
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

    this.state.collection.on('add remove change', () => {
      this.setState({ dataSource: this.updateDataSource() });
    });
  },

  componentWillUnmount() {
	  this.state.collection.off(null, null, this);
  },

  updateDataSource() {
    // Make a clone of the collection model set
    // TODO: Is there a better way to do this?
    var rows = this.state.collection.map((model) => model);
    return this.state.dataSource.cloneWithRows(rows);
  }

});

AppRegistry.registerComponent('TodoList', () => TodoList);

var TodoItem = React.createClass({
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.item.title} - {this.state.item.completed ? 'true' : 'false'}</Text>
      </View>
    );
  },
  getInitialState() {
    return { item: this.props.item };
  },
  componentWillReceiveProps(props) {
    this.setState({ item: props.item });
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

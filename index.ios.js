'use strict';

var React = require('react-native');

var {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  ListView,
  SwitchIOS,
  TouchableHighlight,
} = React;

var Views = require('./lib/views');

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
    marginTop: 20,
    backgroundColor: '#f5fcff'
  },
  editField: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1
  },
  newField: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1
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
    var title = (!this.state.editing) ? (
      <Text onPress={this.handleEditStart}>
        {this.state.item.title}
      </Text>
    ) : (
      <View>
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor={'red'}
          onPress={this.handleDelete}>
          <Text>Delete</Text>
        </TouchableHighlight>
        <TextInput
          style={styles.editField}
          ref="editField"
          autoFocus={true}
          value={this.state.item.title}
          onSubmitEditing={this.handleEditSubmit} />
      </View>
    );
    return (
      <View style={styles.container}>
        <SwitchIOS
          onValueChange={this.handleCompletedChange}
          value={this.state.item.completed} />
        {title}
      </View>
    );
  },
  handleEditSubmit(event) {
    var val = event.nativeEvent.text.trim();
    this.refs.editField.setNativeProps({text: ''});
    this.setState({ editing: false });
    this.state.item.title = val;
  }
});

AppRegistry.registerComponent('TodoItem', () => TodoItem);

var App = React.createClass({
  mixins: [Views.AppCommonMixin],
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>TODO LIST</Text>
        <TextInput style={styles.newField}
          ref="newField"
          value=""
          placeholder="tap to add a new item"
          onSubmitEditing={this.handleNewTodoSubmit} />
        <TodoList collection={this.state.todos} />
      </View>
    );
  },
  handleNewTodoSubmit(event) {
    var val = event.nativeEvent.text.trim();
    this.refs.newField.setNativeProps({text: ''});
    this.state.todos.add({
      title: val,
      completed: false
    });
  }
});

AppRegistry.registerComponent('NativeApp', () => App);

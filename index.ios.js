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
    padding: 10,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  todoList: {
    padding: 10
  },
  todoItem: {
    height: 40,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  todoCompleted: {
    padding: 10
  },
  todoTitle: {
    padding: 10,
    fontSize: 16,
    flex: 1
  },
  todoEditGroup: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  todoDeleteButton: {
    color: '#fff',
    backgroundColor: '#f33',
    right: 0,
    borderColor: 'gray',
    borderWidth: 1
  },
  todoDeleteButtonText: {
    padding: 3
  },
  todoEditField: {
    flex: 1,
    fontSize: 16,
    width: 200,
    height: 35,
    padding: 5,
    marginLeft: 10,
    marginRight: 10,
    borderColor: 'gray',
    borderWidth: 1
  },
  todoNewField: {
    padding: 5,
    fontSize: 16,
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
      <Text style={styles.todoTitle} onPress={this.handleEditStart}>
        {this.state.item.title}
      </Text>
    ) : (
      <View style={styles.todoEditGroup}>
        <TextInput
          style={styles.todoEditField}
          ref="editField"
          autoFocus={true}
          value={this.state.item.title}
          onSubmitEditing={this.handleEditSubmit} />
        <TouchableHighlight
          style={styles.todoDeleteButton}
          activeOpacity={0.6}
          underlayColor={'red'}
          onPress={this.handleDelete}>
          <Text style={styles.todoDeleteButtonText}>Delete</Text>
        </TouchableHighlight>
      </View>
    );
    return (
      <View style={styles.todoItem}>
        <SwitchIOS
          style={styles.todoCompleted}
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
        <TextInput style={styles.todoNewField}
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

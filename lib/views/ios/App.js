var React = require('react-native');

var { ListView, Text, TextInput, View } = React;

var Views = require('../index');
var styles = require('./styles');

var TodoList = require('./TodoList');

var App = module.exports = React.createClass({

  mixins: [Views.AppCommonMixin],

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>TODO LIST</Text>
        <TextInput style={styles.todoNewField}
          ref="newField"
          placeholder="tap to add a new List"
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

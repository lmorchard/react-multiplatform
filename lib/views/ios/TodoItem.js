var React = require('react-native');

var { Text, TextInput, View, ListView, SwitchIOS,
      TouchableHighlight } = React;

var Views = require('../index');
var styles = require('./styles');

var TodoItem = module.exports = React.createClass({

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

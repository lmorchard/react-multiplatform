// Mixins representing shared logic between native views.

var React = require('react-native');

var { Text, TextInput, View, ListView, TouchableHighlight } = React;

exports.TodoListNativeCommonMixin = {
  render() {
    return (
      <ListView
        style={this.styles.todoList}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
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
};

exports.TodoItemNativeCommonMixin = {

  render() {

    var title = (!this.state.editing) ? (
      <Text style={this.styles.todoTitle} onPress={this.handleEditStart}>
        {this.state.item.title}
      </Text>
    ) : (
      <View style={this.styles.todoEditGroup}>

        <TextInput
          style={this.styles.todoEditField}
          ref="editField"
          autoFocus={true}
          defaultValue={this.state.item.title}
          onSubmitEditing={this.handleEditSubmit} />

        <TouchableHighlight
          style={this.styles.todoDeleteButton}
          activeOpacity={0.6}
          underlayColor={'red'}
          onPress={this.handleDelete}>

          <Text style={this.styles.todoDeleteButtonText}>Delete</Text>

        </TouchableHighlight>

      </View>
    );

    return (
      <View style={this.styles.todoItem}>
        {this.renderTodoCompleted()}
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

};

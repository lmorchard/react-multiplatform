// Mixins representing shared logic between web & iOS views.
var React = require('react-native');

var { Text, TextInput, View, ListView, SwitchAndroid,
      TouchableHighlight } = React;

exports.LIST_MODES = [
  {mode: 'all', label: 'All (%s)', state: 'totalCount'},
  {mode: 'active', label: 'Active (%s)', state: 'activeCount'},
  {mode: 'completed', label: 'Completed (%s)', state: 'completedCount'}
];

exports.AppCommonMixin = {
  getInitialState() {
    return {
      app: new (this.appStateClass)()
    };
  },
  setListMode(mode) {
    this.state.app.mode = mode;
  },
  componentDidMount() {
    // FIXME: ()=> and context of `this` seem redundant, but we need the
    // context to later remove all handlers for this component. But, if
    // I just use ('change', this.forceUpdate, this), I get console warnings
    this.state.app.on('change', () => this.forceUpdate(), this);
  },
  componentWillUnmount() {
	  this.state.app.off(null, null, this);
  },
  handleNewTodoSubmit(event) {
    var val = event.nativeEvent.text.trim();
    this.refs.newField.setNativeProps({text: ''});
    this.state.app.todos.add({
      title: val,
      completed: false
    });
  }
};

exports.TodoListCommonMixin = {
  componentWillUnmount() {
	  this.state.app.todos.off(null, null, this);
  }
};

exports.TodoListNativeCommonMixin = {
  render() {
    return (
      <ListView
        style={this.styles.todoList}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}
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

exports.TodoItemCommonMixin = {
  getInitialState() {
    return {
      editing: false,
      item: this.props.item
    };
  },
  handleCompletedChange(value) {
    this.state.item.completed = value;
  },
  handleEditStart() {
    this.setState({ editing: true });
  },
  handleDelete() {
    var item = this.state.item;
    item.collection.remove(item);
  },
  componentDidMount() {
    this.state.item.on('change', () => this.forceUpdate(), this);
  },
  componentWillUnmount() {
	  this.state.item.off(null, null, this);
  },
  componentWillReceiveProps(props) {
    this.setState({ item: props.item });
  },
  componentDidUpdate(prevProps, prevState) {
    if (prevState.item !== this.state.item) {
      prevState.item.off(null, null, this);
      this.state.item.on('change', () => this.forceUpdate(), this);
    }
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

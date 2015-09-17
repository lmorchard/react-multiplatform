var React = require('react-native');

var { ListView, Text, TextInput, View, TouchableHighlight } = React;

var Views = require('../index');
var styles = require('./styles');

var TodoList = require('./TodoList');

var App = module.exports = React.createClass({

  mixins: [Views.AppCommonMixin],

  appStateClass: require('../../models/ios/App'),

  render() {

    var listModeButtons = Views.LIST_MODES.map((item) => {

      var textStyle = (this.state.app.mode == item.mode) ?
        styles.todoListFilterButtonTextSelected :
        styles.todoListFilterButtonText;

      return (
        <TouchableHighlight
          activeOpacity={1}
          animationVelocity={0}
          underlayColor="rgb(210, 230, 255)"
          onPress={()=>this.setListMode(item.mode)}>
          <View style={styles.todoListFiltersButton}>
            <Text style={textStyle}>{item.label.replace('%s', this.state.app[item.state])}</Text>
          </View>
        </TouchableHighlight>
      );

    });

    return (
      <View style={styles.appContainer}>
        <Text style={styles.welcome}>TODO LIST</Text>
        <TextInput style={styles.todoNewField}
          ref="newField"
          placeholder="tap to add a new todo"
          onSubmitEditing={this.handleNewTodoSubmit} />
        <View style={styles.todoListFilters}>
          {listModeButtons}
        </View>
        <TodoList collection={this.state.app.todos.subset} />
      </View>
    );
  },

  handleListModeChange(event) {
    var index = event.nativeEvent.selectedSegmentIndex;
    var selectedMode = Views.LIST_MODES[index];
    this.setListMode(selectedMode ? selectedMode.mode : 'all');
  },

  handleNewTodoSubmit(event) {
    var val = event.nativeEvent.text.trim();
    this.refs.newField.setNativeProps({text: ''});
    this.state.app.todos.add({
      title: val,
      completed: false
    });
  }

});

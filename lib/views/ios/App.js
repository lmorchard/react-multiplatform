var React = require('react-native');

var { ListView, Text, TextInput, View, SegmentedControlIOS } = React;

var CommonMixins = require('../common-mixins');
var NativeMixins = require('../native-mixins');

var styles = require('./styles');

var TodoList = require('./TodoList');

var App = module.exports = React.createClass({

  mixins: [CommonMixins.AppCommonMixin],

  appStateClass: require('../../models/native/App'),

  render() {

    // Build segmented control labels with current filtered list totals
    var listModeValues = CommonMixins.LIST_MODES.map((item) =>
      item.label.replace('%s', this.state.app[item.state]));

    return (
      <View style={styles.appContainer}>
        <Text style={styles.welcome}>TODO LIST</Text>
        <TextInput style={styles.todoNewField}
          ref="newField"
          placeholder="tap to add a new todo"
          onSubmitEditing={this.handleNewTodoSubmit} />
        <SegmentedControlIOS style={styles.todoListMode}
          values={listModeValues}
          selectedIndex={0}
          onChange={this.handleListModeChange} />
        <TodoList collection={this.state.app.todos.subset} />
      </View>
    );
  },

  handleListModeChange(event) {
    var index = event.nativeEvent.selectedSegmentIndex;
    var selectedMode = Views.LIST_MODES[index];
    this.setListMode(selectedMode ? selectedMode.mode : 'all');
  }

});

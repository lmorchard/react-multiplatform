var React = require('react-native');

var { ListView, Text, TextInput, View, TouchableHighlight } = React;

var CommonMixins = require('../common-mixins');
var NativeMixins = require('../native-mixins');

var styles = require('./styles');

var TodoList = require('./TodoList');

var App = module.exports = React.createClass({

  mixins: [CommonMixins.AppCommonMixin],

  appStateClass: require('../../models/native/App'),

  render() {

    var listModeButtons = CommonMixins.LIST_MODES.map((item) => {

      var buttonStyle = (this.state.app.mode == item.mode) ?
        styles.todoListModeButtonSelected :
        styles.todoListModeButton;

      var textStyle = (this.state.app.mode == item.mode) ?
        styles.todoListModeButtonTextSelected :
        styles.todoListModeButtonText;

      return (
        <TouchableHighlight
          style={buttonStyle}
          activeOpacity={1}
          animationVelocity={0}
          underlayColor="rgb(210, 230, 255)"
          onPress={()=>this.setListMode(item.mode)}>
          <View>
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
        <View style={styles.todoListMode}>
          {listModeButtons}
        </View>
        <TodoList collection={this.state.app.todos.subset} />
      </View>
    );
  }

});

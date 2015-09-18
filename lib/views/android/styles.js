var React = require('react-native');

var UI_HIGHLIGHT_COLOR = '#009385';

module.exports = React.StyleSheet.create({
  appContainer: {
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
    // padding: 10
  },
  todoListMode: {
    marginTop: 10,
    marginBottom: 10,
    height: 40,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-around',
    alignItems: 'stretch'
  },
  todoListModeButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: UI_HIGHLIGHT_COLOR,
    height: 40,
    padding: 10
  },
  todoListModeButtonSelected: {
    flex: 1,
    borderWidth: 1,
    borderColor: UI_HIGHLIGHT_COLOR,
    backgroundColor: UI_HIGHLIGHT_COLOR,
    height: 40,
    padding: 10
  },
  todoListModeButtonText: {
    textAlign: 'center',
    color: UI_HIGHLIGHT_COLOR
  },
  todoListModeButtonTextSelected: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold'
  },
  todoItem: {
    height: 40,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  todoCompleted: {
    paddingRight: 10
  },
  todoTitle: {
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 3,
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
    flex: 1,
    backgroundColor: '#f66',
    borderRadius: 4,
    borderWidth: 1,
    padding: 5,
    margin: 2
  },
  todoDeleteButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  todoEditField: {
    flex: 1,
    fontSize: 16,
    width: 200,
    height: 40,
    marginLeft: 1,
    marginRight: 1,
    borderColor: 'gray',
    borderWidth: 1
  },
  todoNewField: {
    fontSize: 16,
    height: 45,
    borderColor: 'gray',
    borderWidth: 1
  }
});

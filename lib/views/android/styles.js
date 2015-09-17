var React = require('react-native');

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
  todoListFilters: {
    height: 40,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  todoListFiltersButton: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    height: 40
  },
  todoListFilterButtonTextSelected: {
    fontWeight: 'bold'
  },
  todoList: {
    // padding: 10
  },
  todoListMode: {
    marginTop: 10,
    marginBottom: 10
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
    height: 45,
    borderColor: 'gray',
    borderWidth: 1
  }
});

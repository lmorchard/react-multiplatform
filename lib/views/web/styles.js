module.exports = {
  appContainer: {
    fontFamily: 'sans-serif',
    fontSize: 14,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    alignContent: 'stretch'
  },
  appTitle: {
    margin: 0,
    padding: 0,
    fontWeight: 'normal',
    textAlign: 'center'
  },
  todoNewField: {
    fontSize: 16,
    padding: 4,
    marginTop: 4,
    marginBottom: 4
  },
  todoListFilters: {
    container: {
      marginTop: 4,
      marginBottom: 4,
      display: 'flex',
      flexDirection: 'row'
    },
    button: {
      textAlign: 'center',
      flexGrow: 1,
      fontSize: 16,
      height: 32,
      borderRadius: 4,
      border: '1px solid #06f',
      color: '#06f',
      backgroundColor: '#fff'
    },
    buttonSelected: {
      color: '#fff',
      backgroundColor: '#06f'
    }
  },
  todoList: {
    listStyleType: 'none',
    margin: 0,
    marginTop: 4,
    padding: 0
  },
  todoListItem: {
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
    completed: {
      width: '3em',
      height: '3em'
    },
    title: {
    },
    editor: {
      container: {
      },
      field: {
      },
      deleteButton: {
      }
    }
  }
}

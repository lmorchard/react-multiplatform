// Mixins representing shared logic between web & iOS views.

exports.AppCommonMixin = {
  getInitialState() {
    return {
      todos: new (this.collectionClass)()
    };
  }
};

exports.TodoListCommonMixin = {
  componentWillUnmount() {
	  this.state.collection.off(null, null, this);
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
    this.state.item.on('change', () => this.forceUpdate());
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
      this.state.item.on('change', () => this.forceUpdate());
    }
  }
}

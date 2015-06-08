// Mixins representing shared logic between web & iOS views.

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
  }
};

exports.TodoListCommonMixin = {
  componentWillUnmount() {
	  this.state.app.todos.off(null, null, this);
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
}

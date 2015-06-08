'use strict';

var State = require('ampersand-state');

module.exports = State.extend({

  initialize: function (options) {
    this.listenTo(this.todos, 'change:completed add remove', this.handleTodosUpdate);
    this.listenTo(this, 'change:mode', this.handleModeChange);
    this.handleTodosUpdate();
  },

  session: {
    activeCount: {
      type: 'number',
      default: 0
    },
    completedCount: {
      type: 'number',
      default: 0
    },
    totalCount:{
      type: 'number',
      default: 0
    },
    allCompleted: {
      type: 'boolean',
      default: false
    },
    mode: {
      type: 'string',
      values: [
        'all',
        'completed',
        'active'
      ],
      default: 'all'
    }
  },

  // Calculate todo collection summary counts to update session props
  handleTodosUpdate: function () {
    var total = this.todos.length;
    var completed = this.todos.getCompletedCount();
    this.set({
      completedCount: completed,
      activeCount: total - completed,
      totalCount: total,
      allCompleted: total === completed
    });
  },

  handleModeChange: function () {
    this.todos.setMode(this.mode);
  }

});

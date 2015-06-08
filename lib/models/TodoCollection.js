'use strict';

var Collection = require('ampersand-collection');
var SubCollection = require('ampersand-subcollection');
var Todo = require('./Todo');
var debounce = require('debounce');

module.exports = Collection.extend({

	model: Todo,

  initialize: function () {

    // Initialize storage
    // TODO: Make this async?
    this.initializeStorage();

		// Attempt to read from localStorage
		this.readFromStorage();

		// This is what we'll actually render
		// it's a subcollection of the whole todo collection
		// that we'll add/remove filters to accordingly.
		this.subset = new SubCollection(this);

		// We put a slight debounce on this since it could possibly
		// be called in rapid succession.
		this.writeToStorage = debounce(this.writeToStorage, 100);

    // Persist changes on any collection changes
		this.on('all', this.writeToStorage, this);

	},

  getCompletedCount: function() {
		return this.reduce(function(total, todo){
			return todo.completed ? ++total : total;
		}, 0);
	},

	// Helper for removing all completed items
	clearCompleted: function () {
		var toRemove = this.filter(function (todo) {
			return todo.completed;
		});
		this.remove(toRemove);
	},

	// Updates the collection to the appropriate mode.
	// mode can 'all', 'completed', or 'active'
	setMode: function (mode) {
		if (mode === 'all') {
			this.subset.clearFilters();
		} else {
			this.subset.configure({
				where: {
					completed: mode === 'completed'
				}
			}, true);
		}
	},

  // No-op storage methods, to be implemented by subclasses
  initializeStorage: function () { },
	writeToStorage: function () { },
	readFromStorage: function () { }

});

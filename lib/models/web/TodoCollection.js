var BaseCollection = require('../TodoCollection');

var STORAGE_KEY = 'todos-ampersand';

var TodoCollection = module.exports = BaseCollection.extend({
  readFromStorage: function () {
		var existingData = localStorage[STORAGE_KEY];
		if (existingData) {
			this.set(JSON.parse(existingData));
		}
  },
  writeToStorage: function () {
		localStorage[STORAGE_KEY] = JSON.stringify(this);
  }
});

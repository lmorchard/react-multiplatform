var BaseCollection = require('../TodoCollection');

var STORAGE_KEY = 'todos-ampersand';

var TodoCollection = module.exports = BaseCollection.extend({
  initializeStorage: function () {
		// Listen for storage events on the window to keep multiple tabs in sync
		window.addEventListener('storage', (e) => {
      if (e.key === STORAGE_KEY) {
        this.readFromStorage();
      }
    });
  },
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

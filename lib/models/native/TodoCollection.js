var BaseCollection = require('../TodoCollection');

var React = require('react-native');
var { AsyncStorage } = React;

var STORAGE_KEY = 'todos-ampersand';

var TodoCollection = module.exports = BaseCollection.extend({
  readFromStorage() {
    AsyncStorage.getItem(STORAGE_KEY).then((existingData) => {
			this.set(JSON.parse(existingData));
    });
  },
  writeToStorage() {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(this));
  }
});

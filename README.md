# react-multiplatform

This is an experiment to build a React web app and a React Native iOS app that
share as much as possible.

## Hacking

¯\\_(ツ)_/¯

```
npm install
gulp server
# Open NativeApp.xcodeproj in XCode, hit Run
```

## Testing

¯\\_(ツ)_/¯

## Working Notes

Here are some notes to myself (and others) as I bungle my way through this.

### TODO / Questions

* Add saving to a remote server?

* Add websocket sync to a multiplayer server for the hell of it?

* Weird mix of spaces and tabs in code borrowed from TodoMVC. Fix it!

* Where's Android? Unreleased, but under development?

* Building & launching the iOS dev app requires launching XCode. I wonder if I
  could just run that all from the command line, ideally from gulp

* Try merging React Native packager.js stuff into gulp build?

[todomvc]: https://github.com/tastejs/todomvc/tree/master/examples/ampersand

### Pros & Cons

* Pros

  * React base component API is (mostly) the same between web & native

  * Many common pieces of view/model integration can be shared via mixins

  * Live Reload & Debug in Chrome are neat features for Native

* Cons

  * Component set differs between web & native

### Decisions & Choices

* Using gulp + browserify + babelify (es6) for web app build chain

  * May need to configure babelify to match [the React Native JS env][jsenv]

[jsenv]: http://facebook.github.io/react-native/docs/javascript-environment.html#content

### Random Observations

* View is the new div

### Issues & Papercuts

* React native live reload pulls away focus from editor & forces Chrome to the
  foreground on every save.

* Web APIs are mostly unavailable in React Native
  
  * There are polyfills for timers, network, geo, and flexbox

* The web buildchain is producing a 3.1mb JS bundle - WTF?!

  * Turning off debug in browserify and adding uglify reduces to ~265k, but
    that's still pretty huge.

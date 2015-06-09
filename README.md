# react-multiplatform

This is an experiment to build a React web app and a React Native iOS app that
share as much as possible.

![Work in progress photo](https://raw.githubusercontent.com/lmorchard/react-multiplatform/master/photo.png)

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

* Web app manifest

* Deploy web app to gh-pages

* node-firefox deployment in gulp is a rough story right now

  * Would be nice if I could somehow make it live-reload rather than completely
    uninstalling, re-installing, and re-launching

* Build a non-dev version of the iOS app

  * Never built / deployed an iOS app before, no idea how to do that.

* Button to purge completed items

* Should inline styles actually live with respective components rather than in
  a central styles.js?

* Exercise some more APIs?

  * Add saving to a remote server?

  * Add websocket sync to a multiplayer server for the hell of it?

  * Geo for place-specific todos?

* Where's Android? Unreleased, but under development?

* Building & launching the iOS dev app requires launching XCode. I wonder if I
  could just run that all from the command line, ideally from gulp

* Try merging React Native packager.js stuff into gulp build?

* Live-update of inline styles without full reload would be great.

* How to handle localization? General JS gettext stuff?

* Arrays of inline styles - thought React supported them, maybe not?

[todomvc]: https://github.com/tastejs/todomvc/tree/master/examples/ampersand

### Pros & Cons

* Pros

  * React base component API is (mostly) the same between web & native

  * Many common pieces of view/model integration can be shared via mixins

  * Live Reload & Debug in Chrome are neat features for Native

* Cons

  * Component set differs between web & native

  * Inline styles work in both, share similar CSS syntax, but cannot be
    practically shared

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

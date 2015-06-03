# react-multiplatform

This is an experiment to build a React web app and a React Native iOS app that
share as much as possible.

## Hacking

¯\_(ツ)_/¯

```
npm install
gulp server
# Open NativeApp.xcodeproj in XCode, hit Run
```

## Testing

¯\_(ツ)_/¯

## Working Notes

Here are some notes to myself (and others) as I bungle my way through this.

### TODO / Questions

* Might try converting the [Ampersand TodoMVC example][todomvc]

* Can I share JS libs between apps?

* Can I share React components?

* Building & launching the iOS dev app requires launching XCode. I wonder if I
  could just run that all from the command line, ideally from gulp

[todomvc]: https://github.com/tastejs/todomvc/tree/master/examples/ampersand

### Process

* Using gulp + browserify + babelify (es6) for web app build chain

  * May need to configure babelify to match [the React Native JS env][jsenv]

[jsenv]: http://facebook.github.io/react-native/docs/javascript-environment.html#content

### Issues

* File watching and changes between Gulp and the React Native packager seem to
  be causing perpetual reciprocal live reloads.

* Web APIs are mostly unavailable in React Native
  
  * There are some polyfills for timers, network, geo, and flexbox

* The web buildchain is producing a 3.1mb JS bundle - WTF?!

  * Turning off debug in browserify and adding uglify reduces to ~265k, but
    that's still pretty huge.

# react-multiplatform

This is an experiment to build a React web app and a React Native iOS app that
share as much as possible.

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

* Web APIs are unavailable in React Native
  
  * There are some polyfills for web APIs, but not a comprehensive set. Maybe
    that list will grow?


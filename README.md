# react-multiplatform

This is an experiment to build a React web app and a React Native iOS app that
share as much as possible.

## Working Notes

Here are some notes to myself (and others) as I bungle my way through this.

### TODO / Questions

* Can I share JS libs between apps?

* Can I share React components?

* Building & launching the iOS dev app requires launching XCode. I wonder if I
  could just run that all from the command line, ideally from gulp

### Process

* Using gulp + browserify + babelify (es6) for web app build chain

  * Achieves some parity with React Native side?
    * Does React Native actually use ES6?

### Issues

* Web APIs are unavailable in React Native

  * Need to build bridges to native resources like sqlite for storage

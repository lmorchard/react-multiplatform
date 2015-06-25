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

### Code sharing

One of the goals of this thing is to see how much code can be shared between
platforms using React for web and React Native. So, I counted some lines of
code.

On the model side, about 74% code is shared, with 26% devoted to each
platform. 

On the view side, about 12% code is shared, with 88% devoted to each
platform.

Of course, these proportions will change, depending on additional app features
and my ability to spot code worth refactoring into the shared code modules.

```
# Total LoC for models = 215
$ cat lib/models/**/*.js | wc -l
     215

# ~74% common model code
$ cat lib/models/*js | wc -l
     159

# ~12% iOS specific model code
$ cat lib/models/ios/*js | wc -l
      25

# ~14% web specific model code
$ cat lib/models/web/*js | wc -l
      31

# Total LoC for views = 533
$ cat lib/views/**/*.js | wc -l
     533

# ~12% common view code
$ cat lib/views/*js | wc -l
      67

# ~44% iOS specific view code
$ cat lib/views/ios/*js | wc -l
     235

# ~43% web specific view code     
$ cat lib/views/web/*js | wc -l
     231
```

### TODO / Questions

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

  * [Looks like ETA is 6 months or so](http://facebook.github.io/react/blog/2015/03/30/community-roundup-26.html)

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

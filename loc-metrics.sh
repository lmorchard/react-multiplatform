#!/bin/zsh

echo Total LoC
cat lib/**/*.js | wc -l

echo All models LoC
cat lib/models/**/*.js | wc -l

echo Common shared models LoC
cat lib/models/*js | wc -l

echo Web specific models LoC
cat lib/models/web/*js | wc -l

echo Native specific models LoC
cat lib/models/native/*js | wc -l

echo All views LoC
cat lib/views/**/*.js | wc -l

echo Common shared views LoC
cat lib/views/common-mixins.js | wc -l

echo Web specific views LoC
cat lib/views/web/*js | wc -l

echo Native shared views LoC
cat lib/views/native-mixins.js | wc -l

echo iOS specific views LoC
cat lib/views/ios/*js | wc -l

echo Android specific views LoC
cat lib/views/android/*js | wc -l

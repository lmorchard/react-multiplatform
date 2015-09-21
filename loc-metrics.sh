#!/bin/zsh

TOTAL_LOC=$(cat lib/**/*.js | wc -l);

MODELS_LOC=$(cat lib/models/**/*.js | wc -l);
MODELS_COMMON_LOC=$(cat lib/models/*js | wc -l);
MODELS_WEB_LOC=$(cat lib/models/web/*js | wc -l);
MODELS_NATIVE_LOC=$(cat lib/models/native/*js | wc -l);

cat << EOF0 > shared-models.svg
<svg version="1.1"
     baseProfile="full"
     width="500" height="500"
     xmlns="http://www.w3.org/2000/svg">

  <defs>
    <style type="text/css"><![CDATA[
      g.base-circles {
        fill-opacity: 0.5;
      }
      text.title, g.base-labels text {
        font-family: monospace;
        font-size: 16pt;
        font-weight: bold;
        fill: black;
        text-anchor: middle;
      }
      text.title {
        text-decoration: underline;
        font-size: 24pt;
      }
      g.areas text {
        font-family: monospace;
        font-size: 16pt;
        fill: black;
        text-anchor: middle;
      }
    ]]></style>
  </defs>

  <rect width="100%" height="100%" fill="transparent" />

  <g class="base-circles">
    <circle cx="33%" cy="33%" r="33%" fill="#f88" />
    <circle cx="66%" cy="33%" r="33%" fill="#8f8" />
    <circle cx="50%" cy="66%" r="33%" fill="#88f" />
  </g>

  <g class="base-labels">
    <text x="20%" y="18%">iOS</text>
    <text x="80%" y="18%">Android</text>
    <text x="50%" y="88%">Web</text>
  </g>

  <g class="areas">
    <text x="20%" y="28%" class="a"></text>
    <text x="50%" y="25%" class="ab">${MODELS_NATIVE_LOC}</text>
    <text x="80%" y="28%" class="b"></text>
    <text x="30%" y="55%" class="ac"></text>
    <text x="50%" y="50%" class="abc">${MODELS_COMMON_LOC}</text>
    <text x="70%" y="55%" class="bc"></text>
    <text x="50%" y="75%" class="c">${MODELS_WEB_LOC}</text>
  </g>

  <text x="50%" y="5%" class="title">Models</text>

</svg>
EOF0

VIEWS_LOC=$(cat lib/views/**/*.js | wc -l);
VIEWS_COMMON_LOC=$(cat lib/views/common-mixins.js | wc -l);
VIEWS_WEB_LOC=$(cat lib/views/web/*js | wc -l);
VIEWS_NATIVE_COMMON_LOC=$(cat lib/views/native-mixins.js | wc -l);
VIEWS_IOS_LOC=$(cat lib/views/ios/*js | wc -l);
VIEWS_ANDROID_LOC=$(cat lib/views/android/*js | wc -l);

cat << EOF1 > shared-views.svg
<svg version="1.1"
     baseProfile="full"
     width="500" height="500"
     xmlns="http://www.w3.org/2000/svg">

  <defs>
    <style type="text/css"><![CDATA[
      g.base-circles {
        fill-opacity: 0.5;
      }
      text.title, g.base-labels text {
        font-family: monospace;
        font-size: 16pt;
        font-weight: bold;
        fill: black;
        text-anchor: middle;
      }
      text.title {
        text-decoration: underline;
        font-size: 24pt;
      }
      g.areas text {
        font-family: monospace;
        font-size: 16pt;
        fill: black;
        text-anchor: middle;
      }
    ]]></style>
  </defs>

  <rect width="100%" height="100%" fill="transparent" />

  <g class="base-circles">
    <circle cx="33%" cy="33%" r="33%" fill="#f88" />
    <circle cx="66%" cy="33%" r="33%" fill="#8f8" />
    <circle cx="50%" cy="66%" r="33%" fill="#88f" />
  </g>

  <g class="base-labels">
    <text x="20%" y="18%">iOS</text>
    <text x="80%" y="18%">Android</text>
    <text x="50%" y="88%">Web</text>
  </g>

  <g class="areas">
    <text x="20%" y="28%" class="a">${VIEWS_IOS_LOC}</text>
    <text x="50%" y="25%" class="ab">${VIEWS_NATIVE_COMMON_LOC}</text>
    <text x="80%" y="28%" class="b">${VIEWS_ANDROID_LOC}</text>
    <text x="30%" y="55%" class="ac"></text>
    <text x="50%" y="50%" class="abc">${VIEWS_COMMON_LOC}</text>
    <text x="70%" y="55%" class="bc"></text>
    <text x="50%" y="75%" class="c">${VIEWS_WEB_LOC}</text>
  </g>

  <text x="50%" y="5%" class="title">Views</text>

</svg>
EOF1

# I feel so dirty using bash + perl like this. I should rewrite this whole thing in node.

TOTAL_IOS_LOC=$VIEWS_IOS_LOC;
TOTAL_NATIVE_COMMON_LOC=$(perl -e "print $MODELS_NATIVE_LOC + $VIEWS_NATIVE_COMMON_LOC");
TOTAL_ANDROID_LOC=$VIEWS_ANDROID_LOC;
TOTAL_COMMON_LOC=$(perl -e "print $MODELS_COMMON_LOC + $VIEWS_COMMON_LOC");
TOTAL_WEB_LOC=$(perl -e "print $MODELS_WEB_LOC + $VIEWS_WEB_LOC");

cat << EOF2 > shared-overall.svg
<svg version="1.1"
     baseProfile="full"
     width="500" height="500"
     xmlns="http://www.w3.org/2000/svg">

  <defs>
    <style type="text/css"><![CDATA[
      g.base-circles {
        fill-opacity: 0.5;
      }
      text.title, g.base-labels text {
        font-family: monospace;
        font-size: 16pt;
        font-weight: bold;
        fill: black;
        text-anchor: middle;
      }
      text.title {
        text-decoration: underline;
        font-size: 24pt;
      }
      g.areas text {
        font-family: monospace;
        font-size: 16pt;
        fill: black;
        text-anchor: middle;
      }
    ]]></style>
  </defs>

  <rect width="100%" height="100%" fill="transparent" />

  <g class="base-circles">
    <circle cx="33%" cy="33%" r="33%" fill="#f88" />
    <circle cx="66%" cy="33%" r="33%" fill="#8f8" />
    <circle cx="50%" cy="66%" r="33%" fill="#88f" />
  </g>

  <g class="base-labels">
    <text x="20%" y="18%">iOS</text>
    <text x="80%" y="18%">Android</text>
    <text x="50%" y="88%">Web</text>
  </g>

  <g class="areas">
    <text x="20%" y="28%" class="a">${TOTAL_IOS_LOC}</text>
    <text x="50%" y="25%" class="ab">${TOTAL_NATIVE_COMMON_LOC}</text>
    <text x="80%" y="28%" class="b">${TOTAL_ANDROID_LOC}</text>
    <text x="30%" y="55%" class="ac"></text>
    <text x="50%" y="50%" class="abc">${TOTAL_COMMON_LOC}</text>
    <text x="70%" y="55%" class="bc"></text>
    <text x="50%" y="75%" class="c">${TOTAL_WEB_LOC}</text>
  </g>

  <text x="50%" y="5%" class="title">Overall</text>

</svg>
EOF2

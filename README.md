React-Native Monorepo: RandomImage
=================
"RandomImage" gets a flat JSON file of image_URLs (from a custom API) and displays 1 random link when the button is clicked. A generic error_image is shown if link cannot be reached due to network error, typo, or is missing.  If the JSON file is older than 5 minutes, a new file is transferred & used. The app was ported from a [Plain JS webapp](https://contactstoolkit.com/demo/randomImage/viaBrowser.html) I created & use.

This is upgrade work to [another monorepo](https://github.com/og-pr/public_ticket.520). The repos are examples for how to share code between different platforms (Web, Android, & iOS). They can be used as a template or starter-kit for React-Native & React-Native-Web. The key to code sharing is React-Native's [Platform-specific extensions](https://facebook.github.io/react-native/docs/platform-specific-code.html#platform-specific-extensions). The extensions are ```.native.js``` , ```.ios.js``` or ```.android.js``` and when used, the relevant platform file is compiled.

The main benefit of any monorepo is to share application logic. Another benefit is the rendering of individual components unique to each platform. Development is mobile-first AND then webapp.

Installation
============

 * Get the repo
* From root directory, do ```yarn```
* Change root/android/local.properties as needed 
* From root/ios directory, do ```pod install``` (if needed)
* react-native link @react-native-community/async-storage (if needed)


**Required:** React-Native working per [Getting Started](https://facebook.github.io/react-native/docs/getting-started). If using React-Native ^0.60 , 
make sure    
you review the [blog post](https://facebook.github.io/react-native/blog/2019/07/03/version-60) & use the [upgrade guide](https://react-native-community.github.io/upgrade-helper/?from=0.59.8&to=0.60.4). As notes in those links, update these files
* Change root/android/build.gradle as needed 
* Change root/android/app/build.gradle as needed 
* Change root/android/gradle.properties as needed
* etc

Run
===

For each platform, from the root directory, do

### Web
* ```node_modules/.bin/webpack -p --progress```
* ```node_modules/.bin/webpack-dev-server --content-base public/ --config ./webpack.config.js --port 3001 --inline --hot --colors```
* Manually open a browser to localhost:3001 to see webapp 
* Inspect browser window = open console to see shared code working on button click

### Android
* ```react-native run-android -- --clear-cache```

### iOS
* ```react-native run-ios``` or open ```ios/RandomImage.xcodeproj``` with Xcode

Screenshots
===========

![Screenshot - all](https://github.com/og-pr/public_ticket.522/blob/master/RandomImage/_docs/monorepo_all.png)
![Animated GIF - iOS](https://github.com/og-pr/public_ticket.522/blob/master/RandomImage/_docs/ezgif-720_ios_c.gif)
![Animated GIF - Andoid](https://github.com/og-pr/public_ticket.522/blob/master/RandomImage/_docs/ezgif-720_android_c.gif)


Notes - Development 
===========
* 2 components (a CustomButton & CustomCard) are used to keep UI consistent.
* Unique image error mechanism used for Web and Mobile (Android/iOS) platforms. 
* The JSON API is at [Google Cloud](https://cloud.google.com/) and is a [Google Apps Script](https://developers.google.com/apps-script/) ; it uses one of my [gists](https://gist.github.com/ottograjeda/).
* Due to different implimentations of Web Storage API, ```localStorage``` is used for Web (see ```web.js```) and ```AsyncStroage``` is used for for Android, & iOS (see ```mobile.js```).  Both files are used in the main component ```CustomCard```. The majority of shared code is in file ```shared.js```.

Notes - Miscellaneous 
=====
* Lerna or Yarn Workspaces is not used ; there is only 1 ```node_modules``` folder
* To make code simple, Redux is omitted. Instead, a global variable is used to help [state](https://facebook.github.io/react-native/docs/state).
* TIP: Working with a monorepo is best if code is created first for web using functional components with minimal UI. Once that is working, then port the code to mobile, as needed. The workflow will require diligence, a few iterations per file, and good testing to avoid circular dependencies from mis-aligned imports or RN required cycles.

Inspiration
===========
* [Update component state from outside React](https://stackoverflow.com/questions/31856712/update-component-state-from-outside-react-on-server-response)
* [A sensible approach to Cross Platform Development](https://dev.to/kylessg/a-sensible-approach-to-cross-platform-development-with-react-and-react-native-57pk)
* [React Stateless Functional Components: 9 wins you might have overlooked](https://hackernoon.com/react-stateless-functional-components-nine-wins-you-might-have-overlooked-997b0d933dbc)

snapaday
===

## setup
```bash
ionic g page Slideshow
ionic g provider Data
ionic g provider SimpleAlert
ionic g pipe DaysAgo
touch src/models/photo-model.ts
```

## plugins

```bash
ionic plugin add cordova-sqlite-storage --save

ionic plugin add de.appplant.cordova.plugin.local-notification --save
npm install @ionic-native/local-notifications --save

ionic plugin add cordova-plugin-camera --save
npm install @ionic-native/camera --save

ionic plugin add cordova-plugin-file --save
npm install @ionic-native/file --save


ionic plugin add cordova-plugin-x-socialsharing --save
npm install @ionic-native/social-sharing --save
```

## app.module.ts
cli会自动加入对StatusBar, SplashScreen的依赖, 我们需要手动添加以下新依赖:
```js
declarations: SlideshowPage, DaysAgo
imports: IonicStorageModule.forRoot()
entryComponents: SlideshowPage
providers: Data, SimpleAlert, LocalNotifications, Camera, File, SocialSharing
```

## Content-Security-Policy
```html
<meta http-equiv="Content-Security-Policy"
      content="font-src 'self' data:; img-src * data:; default-src gap://ready file://* *; script-src 'self' 'unsafe-inline' 'unsafe-eval' *; style-src 'self' 'unsafe-inline' *">

```

## WKWebView plugin
ionic plugin add https://github.com/driftyco/cordova-plugin-wkwebview-engine.git --save

Cordova默认会使用UIWebView, 需要在config.xml中加入以下配置:
```xml
  <feature name="CDVWKWebViewEngine">
    <param name="ios-package" value="CDVWKWebViewEngine"/>
  </feature>
  <preference name="CordovaWebViewEngine" value="CDVWKWebViewEngine"/>
```

## Plugin usage
http://ionicframework.com/docs/v2/native/Camera

take photo, see home.ts
```js
let options = {
  quality: 100,
  destinationType: 1, // return a path to the image on the device
  sourceType: 1, // use the camera to grab the image
  encodingType: 0, // return the iamge in jpeg format
  cameraDirection: 1, // front facing camera
  saveToPhotoAlbum: true // save a copy to the user photo album as well
};

this.camera.getPicture(options).then(imagePath => {
  console.log(imagePath);
}, err => {
  let alert = this.simpleAlert.createAlert('Oops!', 'Something went wrong.');
  alert.present();
});

```

## Android issue
运行`ionic build android`的报错:

```bash

ANDROID_HOME=/Users/cyper/Library/Android/sdk

JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_77.jdk/Contents/Home

Error: Could not find gradle wrapper within Android SDK. Might need to update your Android SDK.
Looked here: /Users/cyper/Library/Android/sdk/tools/templates/gradle/wrapper

```

解决办法:
http://stackoverflow.com/questions/42613882/error-could-not-find-gradle-wrapper-within-android-sdk-might-need-to-update-yo

```bash
cd ~/Library/Android/sdk
# download latest tools
x wget https://dl.google.com/android/repository/tools_r25.2.3-macosx.zip
# overwrite existing tools folder without prompting
unzip -o tools_r25.2.3-macosx.zip
# clean up
rm tools_r25.2.3-macosx.zip
ionic platform rm android
ionic platform add android
```

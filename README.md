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


import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {SlideshowPage} from "../pages/slideshow/slideshow";
import {DaysAgo} from "../pipes/days-ago";
import {IonicStorageModule} from "@ionic/storage";
import {SimpleAlert} from "../providers/simple-alert";
import {Data} from "../providers/data";
import {LocalNotifications} from "@ionic-native/local-notifications";
import {Camera} from "@ionic-native/camera";
import {File} from "@ionic-native/file";
import {SocialSharing} from "@ionic-native/social-sharing";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SlideshowPage,
    DaysAgo
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SlideshowPage
  ],
  providers: [
    Data,
    SimpleAlert,
    LocalNotifications,
    Camera,
    File,
    SocialSharing,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

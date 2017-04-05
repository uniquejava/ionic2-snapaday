import {Component} from '@angular/core';

import {AlertController, ModalController, NavController, Platform} from 'ionic-angular';
import {SimpleAlert} from "../../providers/simple-alert";
import {PhotoModel} from "../../models/photo-model";
import {Data} from "../../providers/data";
import {Camera} from "@ionic-native/camera";
import {File} from "@ionic-native/file";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // to keep track of whether the photos have been loaded from storage yet
  loaded: boolean = false;

  // to tell if a photo has already been taken today
  photoTaken: boolean = false;

  // to hold all of our photo data
  photos: PhotoModel[] = [];

  constructor(public navCtrl: NavController,
              public simpleAlert: SimpleAlert,
              public dataService: Data,
              public platform: Platform,
              public modalCtrl: ModalController,
              public alertCtrl: AlertController,
              public camera: Camera,
              public file: File) {

  }

  ionViewDidLoad(): void {
    this.photos = [
      new PhotoModel('http://placehold.it/100x100', new Date()),
      new PhotoModel('http://placehold.it/100x100', new Date()),
      new PhotoModel('http://placehold.it/100x100', new Date())
    ];

    this.platform.ready().then(_ => {
      this.loadPhotos();
    });

    this.platform.resume.subscribe(_ => {
      if (this.photos.length > 0) {
        this.photoTaken = this.photos[0].date.setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0);
      }
    });


  }

  loadPhotos(): void {

  }

  takePhoto(): any {
    if (!this.loaded || this.photoTaken) {
      return false;
    }
    if (!this.platform.is('cordova')) {
      console.log('You can only take photos on a device!');
      return false;
    }

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
      let alert = this.simpleAlert.createAlert('Oops!', 'Something went wrong:' + err.message);
      alert.present();
    });

  }

  createPhoto(photo): void {

  }

  removePhoto(photo): void {

  }

  playSlideshow(): void {

  }

  sharePhoto(image): void {

  }

  save(): void {

  }

}

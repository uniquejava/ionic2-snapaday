import {Component} from '@angular/core';

import {AlertController, ModalController, NavController, Platform} from 'ionic-angular';
import {SimpleAlert} from "../../providers/simple-alert";
import {PhotoModel} from "../../models/photo-model";
import {Data} from "../../providers/data";
import {Camera} from "@ionic-native/camera";
import {File} from "@ionic-native/file";
import {SlideshowPage} from "../slideshow/slideshow";

declare var cordova;

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
      new PhotoModel('http://placehold.it/100x100', new Date(2017, 3, 1)),
      new PhotoModel('http://placehold.it/100x100', new Date(2017, 2, 1))
    ];

    this.platform.ready().then(_ => {
      this.loadPhotos();
    });

    this.platform.resume.subscribe(_ => {
      this.setPhotoTakenFlag();
    });
  }

  loadPhotos(): void {
    this.dataService.getData().then(photos => {
      let savedPhotos: any = false;
      if (typeof photos !== "undefined") {
        savedPhotos = JSON.parse(photos);
      }
      if (savedPhotos) {
        savedPhotos.forEach(savedPhoto => {
          this.photos.push(new PhotoModel(savedPhoto.image, new Date(savedPhoto.date)));
        });
      }

      this.setPhotoTakenFlag();

      this.loaded = true;
    })
  }

  setPhotoTakenFlag(): void {
    if (this.photos.length > 0) {
      let today = new Date();
      this.photoTaken = this.photos[0].date.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0);
    }
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
      // grab the file name, remove everything before the last / in the imagePath
      let currentName = imagePath.replace(/^.*[\\\/]/, '');

      // create a new file name
      let d = new Date(),
        n = d.getTime(),
        newFileName = n + '.jpg';

      if (this.platform.is('ios')) {
        // move the file to permanent storage
        this.file.moveFile(cordova.file.tempDirectory, currentName, cordova.file.dataDirectory, newFileName).then((success: any) => {
          this.photoTaken = true;

          console.log(success.nativeURL);

          this.createPhoto(success.nativeURL);
          this.sharePhoto(success.nativeURL);
        }, err => {
          console.log(err);
          let alert = this.simpleAlert.createAlert('Oops!', 'Something went wrong:' + err.message);
          alert.present();
        });
      } else {
        this.photoTaken = true;
        this.createPhoto(imagePath);
        this.sharePhoto(imagePath);
      }

    }, err => {
      let alert = this.simpleAlert.createAlert('Oops!', 'Something went wrong:' + err.message);
      alert.present();
    });

  }

  createPhoto(photo): void {
    let newPhoto = new PhotoModel(photo, new Date());
    this.photos.unshift(newPhoto);
    this.save();
  }

  removePhoto(photo): void {
    console.log(photo);

    let today = new Date();
    // if the photo to be removed was taken today.
    if (photo.date.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)) {
      this.photoTaken = false;
    }

    let index = this.photos.indexOf(photo);
    if (index > -1) {
      this.photos.splice(index, 1);
      this.save();
    }
  }

  playSlideshow(): void {
    if (this.photos.length > 1) {
      let modal = this.modalCtrl.create(SlideshowPage, {
        photos: this.photos
      });
      modal.present();
    } else {
      let alert = this.simpleAlert.createAlert('Oops!', 'You need at least 2 photos before you can play a slideshow.');
      alert.present();
    }
  }

  sharePhoto(image): void {

  }

  save(): void {
    this.dataService.save(this.photos);
  }

}

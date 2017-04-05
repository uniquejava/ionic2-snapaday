import {Component, ElementRef, ViewChild} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';

/*
 Generated class for the Slideshow page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-slideshow',
  templateUrl: 'slideshow.html'
})
export class SlideshowPage {
  @ViewChild('imagePlayer') imagePlayer: ElementRef;
  imagePlayerInterval: any;
  photos: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.photos = navParams.get('photos');
  }

  ionViewDidEnter() {
    this.playPhotos();
  }

  closeModal(): void {
    this.viewCtrl.dismiss();
  }

  playPhotos(): void {
    let imagePlayer = this.imagePlayer.nativeElement;
    let i = 0;

    // clear any interval already set
    clearInterval(this.imagePlayerInterval);

    // restart
    this.imagePlayerInterval = setInterval(_ => {
      if (i < this.photos.length) {
        imagePlayer.src = this.photos[i].image;
        i++;
      } else {
        clearInterval(this.imagePlayerInterval);
      }
    }, 500);
  }

}

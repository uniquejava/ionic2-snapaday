import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {AlertController} from "ionic-angular";

/*
 Generated class for the SimpleAlert provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class SimpleAlert {

  constructor(public http: Http, public alertCtrl: AlertController) {
    console.log('Hello SimpleAlert Provider');
  }

  createAlert(title: string, message: string) {
    return this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'Ok'
        }
      ]
    });
  }


}

import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {SimpleAlert} from "../../providers/simple-alert";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public simpleAlert: SimpleAlert) {

  }

}

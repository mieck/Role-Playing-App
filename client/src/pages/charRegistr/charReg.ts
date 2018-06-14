import { Component } from '@angular/core';
import {Events, NavController} from 'ionic-angular';

@Component({
  selector: 'page-char-reg',
  templateUrl: 'charReg.html'
})
export class CharRegistrPage {

  public attributes: Array<any>;
  public description: string;
  public ownChar: boolean;


  constructor(public navCtrl: NavController, public events: Events) {
    this.attributes = [
      {attr: "Name", value: "Klaus"},
      {attr: "Alter", value: 12},
      {attr: "Geschlecht", value: "männlich"},
    ];

    this.description = "Hier steht was";
    this.ownChar = true;

  }

  goToPosts(){
    this.events.publish('user:login', true);
  }

}

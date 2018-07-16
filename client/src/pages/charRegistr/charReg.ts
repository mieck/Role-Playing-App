import { Component } from '@angular/core';
import {Events, NavController} from 'ionic-angular';
import {map} from "rxjs/operators";
import {Http} from "@angular/http";
import {GlobalProvider} from "../../provider/global";

@Component({
  selector: 'page-char-reg',
  templateUrl: 'charReg.html'
})
export class CharRegistrPage {

  public attributes: Array<any>;
  public description: string;
  public name: string;
  public profileImage:String;

  constructor(private http: Http, public navCtrl: NavController, public events: Events, public global: GlobalProvider,) {
    this.profileImage = "assets/imgs/ProfileImage.png";
  }

  goToPosts(){
    this.events.publish('user:login', true);
  }

  ionViewDidLoad(){

    var char_id = window.sessionStorage.getItem("char_id");

    this.http.post(this.global.serverHost + '/find_character', {id: char_id}).pipe(
      map(res => res.json())
    ).subscribe(response => {
      this.name = response.CharacterName;
      this.description = response.CharacterBeschreibung;
      this.attributes = response.CharacterAttributes;
      this.profileImage = "assets/imgs/ProfileImage.png";
    });
  }

}

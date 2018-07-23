import { Component } from '@angular/core';
import {Events, NavController} from 'ionic-angular';
import {CharacterEditPage} from "../character-edit/character-edit";
import {map} from "rxjs/operators";
import {Http} from "@angular/http";
import {GlobalProvider} from "../../provider/global";

@Component({
  selector: 'page-character',
  templateUrl: 'character.html'
})
export class CharacterPage {

  public attributes: Array<any>;
  public description: string;
  public name: string;
  public ownChar:boolean;
  public profileImage:String;

  constructor(private http: Http, public navCtrl: NavController, public global: GlobalProvider) {
  }

  editCharacter() {
    this.navCtrl.push(CharacterEditPage);
  }

  ionViewWillEnter(){

    var char_id = window.sessionStorage.getItem("char_id");

    if (char_id == this.global.otherCharID) {
      this.ownChar = true;
    } else {
      this.ownChar = false;
    }

    this.http.post(this.global.serverHost + '/find_character', {id: this.global.otherCharID}).pipe(
      map(res => res.json())
    ).subscribe(response => {
      this.name = response.CharacterName;
      this.description = response.CharacterBeschreibung;
      this.attributes = response.CharacterAttributes;
      this.profileImage = response.CharacterBild;
    });
  }

}

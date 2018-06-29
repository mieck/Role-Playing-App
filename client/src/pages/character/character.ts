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

  constructor(private http: Http, public navCtrl: NavController, public global: GlobalProvider) {
  }

  editCharacter() {
    this.navCtrl.push(CharacterEditPage);
  }

  ionViewDidLoad() {

    var char_id = window.sessionStorage.getItem("char_id");

    if (char_id == this.global.otherCharID) {
      document.getElementById('editButton').style.visibility = 'visible';
    } else {
      document.getElementById('editButton').style.visibility = 'hidden';
    }
  }

  ionViewWillEnter(){

    this.http.post('http://localhost:8080/find_character', {id: this.global.otherCharID}).pipe(
      map(res => res.json())
    ).subscribe(response => {
      this.name = response.CharacterName;
      this.description = response.CharacterBeschreibung;
      this.attributes = response.CharacterAttributes;
    });
  }

}

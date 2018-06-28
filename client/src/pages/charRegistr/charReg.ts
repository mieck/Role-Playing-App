import { Component } from '@angular/core';
import {Events, NavController} from 'ionic-angular';
import {map} from "rxjs/operators";
import {Http} from "@angular/http";

@Component({
  selector: 'page-char-reg',
  templateUrl: 'charReg.html'
})
export class CharRegistrPage {

  public attributes: Array<any>;
  public description: string;
  public name: string;


  constructor(private http: Http, public navCtrl: NavController, public events: Events) {
  }

  goToPosts(){
    this.events.publish('user:login', true);
  }

  ionViewWillEnter(){

    var char_id = window.sessionStorage.getItem("char_id");

    this.http.post('http://localhost:8080/find_character', {id: char_id}).pipe(
      map(res => res.json())
    ).subscribe(response => {
      this.name = response.CharacterName;
      this.description = response.CharacterBeschreibung;
      this.attributes = response.CharacterAttributes;
    });
  }

}

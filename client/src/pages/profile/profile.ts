import { Component } from '@angular/core';
import {Http} from "@angular/http";
import {map} from 'rxjs/operators';
import { NavController} from 'ionic-angular';
import {LoginPage} from "../login/login";
import { Events } from 'ionic-angular';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  name:string;
  password:string;
  mail:string;
  oldpassword:string;

  saved:boolean;

  constructor(private http: Http, public navCtrl:NavController, public events: Events) {
    this.saved = false;
  }

  logout(){
    this.events.publish('user:logout', 'hurray');
  }

  editProfile() {
    this.saved = false;

    var id = window.sessionStorage.getItem("id");
    let data = {};

    console.log(this.password);

    if(this.password == undefined) {
      data = {
        "spieleremail": this.mail,
        "spielerpasswort": this.oldpassword,
        "spielerId": id,
      };
    }else{
      data = {
        "spieleremail": this.mail,
        "spielerpasswort": this.password,
        "spielerId": id,
      };
    }

    this.http.post('http://localhost:8080/update_profile', data).pipe(
      map(res => res.json())
    ).subscribe(response => {
      console.log(response);
      this.saved = true;
    },(err) => {

      }
    );

  }

  ionViewDidLoad(){
    var id = window.sessionStorage.getItem("id");

    this.http.post('http://localhost:8080/checkprofile', {id: id}).pipe(
      map(res => res.json())
    ).subscribe(response => {
      this.name = response.spielername;
      this.mail = response.spieleremail;
      this.oldpassword = response.spieleremail;
    });
  }

}

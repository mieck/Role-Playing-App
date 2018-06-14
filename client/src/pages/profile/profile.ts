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

  constructor(private http: Http, public navCtrl:NavController, public events: Events) {

  }

  logout(){
    this.events.publish('user:logout', 'hurray');
  }

  editProfile() {

    let data = {
      "name": this.name,
      "password": this.password,
      "mail": this.mail,
    };

    this.http.post('http://localhost:8080/checkname', data).pipe(
      map(res => res.json())
    ).subscribe(response => {
      console.log('POST Response:', response);
    });

    this.http.get('http://localhost:8080/checkname/' + this.name).pipe(
      map(res => res.json())
    ).subscribe(response => {
      console.log('GET Response:', response);
    });
  }

}

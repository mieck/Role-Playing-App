import { Component } from '@angular/core';
import {Http} from "@angular/http";
import {map} from 'rxjs/operators';
import { NavController} from 'ionic-angular';
import {RegisterPage} from "../register/register";
import {ProfilePage} from "../profile/profile";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  name:string;
  password:string;

  constructor(private http: Http, public navCtrl:NavController) {

  }

  GoToRegister(){
    //Mit "Zurück"-Funktion
    this.navCtrl.push(RegisterPage);

    //Ohne "Zurück"-Funktion
    // this.navCtrl.setRoot(RegisterPage);
    // this.navCtrl.popToRoot();
  }

  checkLogin() {

    let data = {
        "spielername": this.name,
        "spielerpasswort": this.password
    };

    this.http.post('http://localhost:8080/way/login', data).pipe(
      map(res => res.json())
    ).subscribe(response => {
      console.log('POST Response:', response);
    });

    /*this.http.get('http://localhost:8080/singup' + this.name).pipe(
      map(res => res.json())
    ).subscribe(response => {
      console.log('GET Response:', response);
    });*/

    this.navCtrl.setRoot(ProfilePage);
    this.navCtrl.popToRoot();

  }

}

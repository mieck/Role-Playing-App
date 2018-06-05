import { Component } from '@angular/core';
import {Http} from "@angular/http";
import {map} from 'rxjs/operators'
import {NavController} from "ionic-angular";
import {CharacterPage} from "../character/character";

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})


export class RegisterPage {
  name:string;
  password:string;
  mail:string;

  constructor(private http: Http, public navCtrl:NavController) {

  }
  checkRegister() {

    console.log('klicked!');
    let data = {
      "spielername": this.name,
      "spielerpasswort": this.password,
      "spieleremail": this.mail,
    };

    this.http.post('http://localhost:8080/way/singup', data).pipe(
      map(res => res.json())
    ).subscribe(response => {
      console.log('POST Response:', response);
    });

    this.navCtrl.setRoot(CharacterPage);
    this.navCtrl.popToRoot();

   /* this.http.get('http://localhost:8080/checkname/' + this.name).pipe(
      map(res => res.json())
    ).subscribe(response => {
      console.log('GET Response:', response);
    });*/
  }

}

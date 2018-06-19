import { Component } from '@angular/core';
import {Http} from "@angular/http";
import {map} from 'rxjs/operators'
import {NavController} from "ionic-angular";
import {CreateRPGPage} from "../createRPG/createRPG";
import {CharacterEditPage} from "../character-edit/character-edit";
import {GlobalProvider} from "../../provider/global";

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})


export class RegisterPage {
  name:string;
  password:string;
  mail:string;

  admin:boolean;

  constructor(private http: Http, public navCtrl:NavController, public global: GlobalProvider) {

  }
  checkRegister() {

    console.log('klicked!');
    this.admin = true;  // erstmal damit der cran gut läuft!
    let data = {
      "spielername": this.name,
      "spielerpasswort": this.password,
      "spieleremail": this.mail,
    };

    this.http.post('http://localhost:8080/register', data).pipe(
      map(res => res.json())
    ).subscribe(response => {
      console.log('POST Response:', response);
    });

    //
    if(this.admin){
      this.navCtrl.setRoot(CreateRPGPage);
      this.navCtrl.popToRoot();
    }
    else{
      this.navCtrl.setRoot(CharacterEditPage);
      this.navCtrl.popToRoot();
    }

  }

  ionViewWillEnter(){
    this.global.registrationComplete = false;
  }

}

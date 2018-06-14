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

    this.admin = true;
    if(this.admin){
      this.navCtrl.setRoot(CreateRPGPage);
      this.navCtrl.popToRoot();
    }
    else{
      this.navCtrl.setRoot(CharacterEditPage);
      this.navCtrl.popToRoot();
    }

    /* this.http.get('http://localhost:8080/checkname/' + this.name).pipe(
       map(res => res.json())
     ).subscribe(response => {
       console.log('GET Response:', response);
     });*/
  }

  ionViewWillEnter(){
    this.global.registrationComplete = false;
  }

}

import { Component } from '@angular/core';
import {Http} from "@angular/http";
import {map} from 'rxjs/operators'
import {AlertController, NavController} from "ionic-angular";
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

  constructor(private http: Http, public navCtrl:NavController, public global: GlobalProvider, public alerCtrl: AlertController) {

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
    ).subscribe((response) => {
      console.log('POST Response:', response);
      window.sessionStorage.setItem("id", response._id);
      console.log(response._id);
      var id = window.sessionStorage.getItem("id");
      console.log(id);

      if(this.admin){
        this.navCtrl.setRoot(CreateRPGPage);
        this.navCtrl.popToRoot();
      }
      else{
        this.navCtrl.setRoot(CharacterEditPage);
        this.navCtrl.popToRoot();
      }
    },
      (err) => {
      console.log(err._body);
        if(err._body=="Name doppelt")
          this.showConfirm(err._body,'Der Name ist schon vergeben!','Neuer Versuch');
    });

  }

  showConfirm(title,message,firstAction) {

    const confirm = this.alerCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: firstAction,
          handler: () => {
          }
        }
      ]
    });
    confirm.present();
  }

  ionViewWillEnter(){
    this.global.registrationComplete = false;
  }

}

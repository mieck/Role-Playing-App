import { Component } from '@angular/core';
import {Http} from "@angular/http";
import {map} from 'rxjs/operators'
import {AlertController, NavController} from "ionic-angular";
import {CreateRPGPage} from "../createRPG/createRPG";
import {CharacterEditPage} from "../character-edit/character-edit";
import {GlobalProvider} from "../../provider/global";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})

export class RegisterPage {
  user:any;

  constructor(private http: Http, public navCtrl:NavController, public global: GlobalProvider, public alerCtrl: AlertController) {

    this.user = new FormGroup({
      name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      mail: new FormControl('')
    });

  }


  checkRegister() {
    console.log(this.user);
    let data = {
      "spielername": this.user.controls.name.value,
      "spielerpasswort": this.user.controls.password.value,
      "spieleremail": this.user.controls.mail.value,
    };
    this.http.post(this.global.serverHost + '/register', data).pipe(
      map(res => res.json())
    ).subscribe((response) => {
      console.log('POST Response:', response);
      window.sessionStorage.setItem("id", response._id);
      this.global.spielername = response.spielername;

      this.findRPG();

    },(err) => {
      console.log(err._body);
      if(err._body=="Name doppelt")
        this.showConfirm(err._body,'Der Name ist schon vergeben!','Neuer Versuch');
    });
  }

  findRPG() {
    this.http.get(this.global.serverHost + '/find_all').pipe(
      map(res => res.json())
    ).subscribe(response => {
      console.log(response.length);
      if (response.length > 0) {
        window.sessionStorage.setItem("rpgid", response[0]._id);
        this.global.isAdmin = false;
        this.navCtrl.setRoot(CharacterEditPage);
        this.navCtrl.popToRoot();
      } else {
        this.navCtrl.setRoot(CreateRPGPage);
        this.navCtrl.popToRoot();
      }
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

  showConfirmName() {

    const confirm = this.alerCtrl.create({
      title: "Nutzername kann dann nicht mehr geändert werden",
      message: "Registrierung abschließen?",
      buttons: [
        {
          text: "Noch nicht",
          handler: () => {

          }
        },
        {
          text: "Ja",
          handler: () => {
            this.checkRegister()
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

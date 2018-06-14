import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ProfilePage} from "../profile/profile";
import {SettingsPage} from "../settings/settings";
import {CharacterPage} from "../character/character";

@Component({
  selector: 'page-posts',
  templateUrl: 'posts.html'
})
export class PostsPage {

  public posts: Array<any>;

  constructor(public navCtrl: NavController) {

    this.posts = [
      {character: "Beelzebub",
        text: "Die Mittagssonne prasselte unaufhaltsam auf seine Haut, während der Braunhaarige die überfüllten Straßen entlang ging und Ausschau nach einem Platz zum Ausruhen suchte. Wegen dieser einen Information war Jean nun schon wochenlang unterwegs, ohne ein bequemes Bett oder eine nahrhafte Mahlzeit sein Eigen genannt zu haben. Einzig allein ein abgetragener Hut, der ihn nur bedingt vor der Sonne schützte, konnte er als erfolgreiche Ausbeute der vergangenen Tage seinen Erinnerungen entnehmen.\n" +
        "Er blinzelte mehrfach durch seine Sonnenbrille hindurch, um die Schilder der Geschäfte näher betrachten zu können. Es war ihm ganz egal was; sobald er etwas zu Essen finden sollte, würde es nehmen, denn sein Magenknurren hatte sich seit zwei Stunden entschlossen, keine Pausen mehr einzulegen.",
        bild: "assets/imgs/ProfileImage.png"},
      {character: "Beelzebub",
        text: "Die Mittagssonne prasselte unaufhaltsam auf seine Haut, während der Braunhaarige die überfüllten Straßen entlang ging und Ausschau nach einem Platz zum Ausruhen suchte. Wegen dieser einen Information war Jean nun schon wochenlang unterwegs, ohne ein bequemes Bett oder eine nahrhafte Mahlzeit sein Eigen genannt zu haben. Einzig allein ein abgetragener Hut, der ihn nur bedingt vor der Sonne schützte, konnte er als erfolgreiche Ausbeute der vergangenen Tage seinen Erinnerungen entnehmen.\n" +
        "Er blinzelte mehrfach durch seine Sonnenbrille hindurch, um die Schilder der Geschäfte näher betrachten zu können. Es war ihm ganz egal was; sobald er etwas zu Essen finden sollte, würde es nehmen, denn sein Magenknurren hatte sich seit zwei Stunden entschlossen, keine Pausen mehr einzulegen.",
        bild: "assets/imgs/ProfileImage.png"}
    ];

  }

  goToCharacter() {
    this.navCtrl.push(CharacterPage);
  }

  goToProfile() {
    this.navCtrl.push(ProfilePage);
  }

}

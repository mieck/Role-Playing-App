import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {CharacterPage} from "../character/character";

@NgModule({
  declarations: [
    CharacterPage,
  ],
  imports: [
    IonicPageModule.forChild(CharacterPage),
  ],
  exports: [
    CharacterPage,
  ]

})

export class RegisterPageModule {}

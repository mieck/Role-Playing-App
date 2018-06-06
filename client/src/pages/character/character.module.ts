import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {CharacterEditPage} from "../character-edit/character-edit";

@NgModule({
  declarations: [
    CharacterEditPage
  ],
  imports: [
    IonicPageModule.forChild(CharacterEditPage)
  ],
  exports: [
    CharacterEditPage
  ]

})

export class CharacterPageModule {}

import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {RegisterPage} from "../register/register";
import {ProfilePage} from "../profile/profile";

@NgModule({
  declarations: [
    RegisterPage,
    ProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterPage),
    IonicPageModule.forChild(ProfilePage),
  ],
  exports: [
    RegisterPage,
    ProfilePage,
  ]

})

export class LoginPageModule {}

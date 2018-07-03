import { Injectable } from '@angular/core';
/*
  Generated class for the Global provider.
*/
@Injectable()
export class GlobalProvider {

  public registrationComplete:boolean;

  public otherCharID:String;

  //IP Marie PC cmd -> ipconfig -> IPv4 Adresse
  //public serverHost:String ="http://192.168.0.20:8080";

  //Local Host
  public serverHost:String = "http://localhost:8080";

  public isAdmin:boolean;
}

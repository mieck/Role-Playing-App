import { Component } from '@angular/core';
import {Http} from "@angular/http";
import {map} from 'rxjs/operators'

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})


export class RegisterPage {
  name:string;
  password:string;
  mail:string;

  constructor(private http: Http) {

  }
  checkRegister() {

    let data = {
      "name": this.name,
      "password": this.password,
      "mail": this.mail,
    };

    this.http.post('http://localhost:8080/checkname', data).pipe(
      map(res => res.json())
    ).subscribe(response => {
      console.log('POST Response:', response);
    });

    this.http.get('http://localhost:8080/checkname/' + this.name).pipe(
      map(res => res.json())
    ).subscribe(response => {
      console.log('GET Response:', response);
    });
  }

}

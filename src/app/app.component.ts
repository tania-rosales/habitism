import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import firebase from 'firebase/compat/app';
import { LoginService } from './services/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  constructor (private loginService: LoginService){}
  
  ngOnInit(): void {
      firebase.initializeApp({
        apiKey: "AIzaSyCT6HdpFe8G23oGrOjYn-YrndcyCb4Ryl4",
        authDomain: "habitism-85fa5.firebaseapp.com"
      });
  }

  estaLogueado(){
    return this.loginService.estaLogueado();
  }

  logout(){
    this.loginService.logout();
  }

}

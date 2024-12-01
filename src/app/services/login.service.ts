import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  token: string;
  errorMessage: string | null;
  
  constructor ( private router: Router,
                private cookies: CookieService
              ){}

  
  login(email: string, password: string): Promise<void> {
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        return firebase.auth().currentUser?.getIdToken()
          .then(token => {
            this.token = token;
            this.cookies.set('token', this.token);
            this.router.navigate(['/']);
          });
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  getIdToken(){
    return this.cookies.get('token');
  }

  estaLogueado(){
    return this.cookies.get('token');
  }

  logout(){
    firebase.auth().signOut()
    .then(
      ()=>{
        this.token = "";
        this.cookies.set('token', this.token);
        this.router.navigate(['/frontpage']);
      }
    )

    
  }

  registro(email: string, password: string): Promise<void>{
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(
      () =>{
        return firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        return firebase.auth().currentUser?.getIdToken()
          .then(token => {
            this.token = token;
            this.cookies.set('token', this.token);
            this.router.navigate(['/']);
          });
      })
      .catch(error => {
        return Promise.reject(error);
      });
      })
      .catch((error) => {
        this.errorMessage = error.message;
        
      });
  }

}
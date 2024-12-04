import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { CookieService} from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  token: string;
  errorMessage: string | null;
  private uidSubject = new BehaviorSubject<string | null>(null);
  private emailSubject = new BehaviorSubject<string | null>(null);

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

  uid_observable (){
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.uidSubject.next(user.uid); // Actualiza el UID
      } else {
        this.uidSubject.next(null); // Limpia el UID cuando no hay usuario
      }
    });
  }

  // Método para obtener el UID actual
  getUid() {
    this.uid_observable();
    return this.uidSubject.asObservable(); // Devuelve un observable para el UID
  }

  correo_observable (){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.emailSubject.next(user.email); // Actualiza el correo
      } else {
        this.emailSubject.next(null); // Limpia el correo cuando no hay usuario
      }
    });
  }

  getEmail() {
    this.correo_observable();
    return this.emailSubject.asObservable();
  }

}
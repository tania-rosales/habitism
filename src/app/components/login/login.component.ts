
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  providers: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor (private loginService: LoginService){}

  login (form: NgForm){
    const email = form.value.email;
    const password = form.value.password;

    if (email === '' && password === '') {
      alert('Ingrese sus credenciales');
    }else {
      this.loginService.login(email, password);
    }
  }

  onLogin() {
    this.loginService.login(this.email, this.password)
      .then(() => {
        this.errorMessage = null; // Limpiamos el mensaje en caso de éxito
      })
      .catch(error => {
        // Guardamos el mensaje de error
        switch (error.code) {
          case 'auth/user-not-found':
            this.errorMessage = 'El correo no está registrado.';
            break;
          case 'auth/invalid-credential':
            this.errorMessage = 'Credenciales incorrectas';
            break;
          case 'auth/invalid-email':
            this.errorMessage = 'Ingrese su correo y clave';
            break;
          case 'auth/missing-password':
            this.errorMessage = 'Ingrese su contraseña.';
            break;
          default:
            this.errorMessage = `Error inesperado: ${error.message}`;
        }
      });
    }
}
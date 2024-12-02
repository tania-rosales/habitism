import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  providers: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor (private loginService: LoginService){}

  email: string = '';
  password: string = '';
  errorMessage: string | null = null;

  onRegister () {
    this.loginService.registro(this.email, this.password)
    .then(() => {
        this.errorMessage = null; // Limpiamos el mensaje en caso de éxito
      })
      .catch(error => {
        this.errorMessage = `Error inesperado: ${error.message}`;
      });
  }

}
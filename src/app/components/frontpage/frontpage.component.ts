import { CommonModule } from '@angular/common';
import { Component, OnInit, HostListener } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-frontpage',
  standalone:true,
  imports: [CommonModule, RouterModule],
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.css']
})
export class FrontpageComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router){};
  cards = [
    {
      image: 'assets/2minutos.webp',
      title: 'La regla de los dos minutos',
      description: 'Comienza pequeño: cualquier hábito puede iniciarse en menos de dos minutos.',
    },
    {
      image: 'assets/espacio-personal.jpg',
      title: 'El poder del ambiente',
      description: 'Diseña tu espacio para favorecer buenos hábitos y evitar los malos.',
    },
    {
      image: 'assets/motivacion.jpg',
      title: 'Hazlo atractivo',
      description: 'Asocia tus hábitos con algo que disfrutes para mantener la motivación.',
    },
  ];

  ngOnInit(): void {
      
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const cards = document.querySelectorAll('.card');
    const windowHeight = window.innerHeight;

    cards.forEach((card) => {
      const cardTop = card.getBoundingClientRect().top;
      if (cardTop < windowHeight - 100) {
        card.classList.add('card-visible');
      } else {
        card.classList.remove('card-visible');
      }
    });
  }

  estaLogueado(){
    return this.loginService.estaLogueado();
  }

  redirigir() {
    if (this.estaLogueado()) {
      this.router.navigate(['/']);  // Ruta a la que irá si está logueado
    } else {
      this.router.navigate(['/login']);  // Ruta a la que irá si no está logueado
    }
  }

  redirigir2() {
    if (this.estaLogueado()) {
      this.router.navigate(['listHabits']);  // Ruta a la que irá si está logueado
    } else {
      this.router.navigate(['/login']);  // Ruta a la que irá si no está logueado
    }
  }
}


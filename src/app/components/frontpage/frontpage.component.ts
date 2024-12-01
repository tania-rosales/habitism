import { CommonModule } from '@angular/common';
import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-frontpage',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.css']
})
export class FrontpageComponent implements OnInit {
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
}


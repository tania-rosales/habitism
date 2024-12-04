import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { habitModel } from '../../models/habit-form.model';
import { habitsService } from '../../services/habit-form-services/habit-form.service';
import { AlertsService } from '../../services/alerts.service';

@Component({
  selector: 'app-habit-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  providers: [AlertsService],
  templateUrl: './habit-list.component.html',
  styleUrl: './habit-list.component.css'
})
export class HabitListComponent implements OnInit{
  @Input() habitosLista: habitModel;
  @Input() indice: number;
  
  titulo = 'Mis hábitos';
  habitos: habitModel[];

  constructor (private alerta: AlertsService, private habitsService: habitsService){}

  ngOnInit(): void {
    this.habitsService.obtener_habitos().subscribe(
      misHabitos => {
        console.log(misHabitos);
        this.habitos = Object.values(misHabitos);
        this.habitsService.set_habitos(this.habitos)
        
      }
    )
  }
}

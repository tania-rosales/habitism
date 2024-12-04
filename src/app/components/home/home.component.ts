import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';
import { habitModel } from '../../models/habit-form.model';
import { habitsService } from '../../services/habit-form-services/habit-form.service';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  habitos: habitModel[];

  uid: string | null = null;
  bandera: boolean = false;
  

  constructor(private calendarService:CalendarService, private habitsService: habitsService, private loginService: LoginService){}

  ngOnInit(): void {
    
    // Obtenemos el UID del usuario.
    this.loginService.getUid().subscribe((uid) => {
      this.uid = uid;

      // Una vez que tenemos el UID, obtenemos los hábitos.
      this.habitsService.obtener_habitos().subscribe((misHabitos) => {
        // Convertir el objeto a un arreglo.
        const todosLosHabitos = Object.values(misHabitos);

        // Filtrar los hábitos que coincidan con el UID.
        this.habitos = todosLosHabitos.filter((h) => h.uid === this.uid);

        // Verificar si hay al menos un hábito con el UID.
        this.bandera = this.habitos.length > 0;

        // Log para depuración.
        console.log('Hábitos filtrados:', this.habitos);
        console.log('Bandera:', this.bandera);

        // Si hay hábitos válidos, los guardamos en el servicio.
        if (this.bandera) {
          this.habitsService.set_habitos(this.habitos);
        } else {
          console.warn('No se encontraron hábitos para este UID.');
        }
      });
    });
  }
}

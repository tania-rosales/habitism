import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { habitModel } from '../../models/habit-form.model';
import { habitsService } from '../../services/habit-form-services/habit-form.service';
import { AlertsService } from '../../services/alerts.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-habit-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  providers: [AlertsService],
  templateUrl: './habit-form.component.html',
  styleUrl: './habit-form.component.css'
})
export class HabitFormComponent implements OnInit{
  titulo = 'Nuevo Hábito';
  habitos: habitModel[];
  cuadroHabitName: string = "";
  cuadroGoal: number;
  cuadroDate: Date;
  cuadroDescription: string;
  habitStatus: boolean = false;
  maxDate: string;
  uid: string;

  constructor (private alerta: AlertsService, private habitsService: habitsService, private loginService: LoginService){
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    this.maxDate = `${year}-${month}-${day}`;
    this.cuadroDate = new Date(this.maxDate)

    this.loginService.getUid().subscribe(
      (uid) => {
        this.uid = String(uid);
      }
    )
  }

  ngOnInit(): void {
      this.habitsService.obtener_habitos().subscribe(
        misHabitos => {
          console.log(misHabitos);
          this.habitos = Object.values(misHabitos);
          this.habitsService.set_habitos(this.habitos)
          
        }
      )
  }

  guardar_habito(){
    let miHabito = new habitModel(this.cuadroHabitName,
                                  this.cuadroGoal,
                                  this.cuadroDate,
                                  this.cuadroDescription,
                                  this.habitStatus,
                                  this.uid
                                );
    this.habitsService.agregar_habito_servicio(miHabito);
    this.cuadroHabitName;
    this.cuadroGoal;
    this.cuadroDate;
    this.cuadroDescription
    this.uid;
  }

  limpiarFormulario(formulario: any){
    formulario.resetForm();
  }

}

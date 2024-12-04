import { Injectable } from "@angular/core";
import { habitModel } from "../../models/habit-form.model";
import { AlertsService } from "../alerts.service";
import { DataHabitsServices } from "./data-habit-form.service";

@Injectable({
  providedIn: 'root'
})

export class habitsService{
  habits: habitModel [] = [] ;

  constructor (private alerta: AlertsService, private dataHabitsService: DataHabitsServices){}

  agregar_habito_servicio (habits: habitModel){
    this.alerta.sweetalert('Exito', 'Nuevo hábito registrado', 'success');
    this.habits.push(habits);
    this.dataHabitsService.save_habit(this.habits);
  }

  encontrar_habitos (indice: number){
    let habit: habitModel = this.habits[indice];
    return habit;
  }

  actualizar_habito (indice: number, habit: habitModel){
    let habitModified = this.habits[indice];
    habitModified.habitName = habit.habitName;
    habitModified.goal = habit.goal;
    habitModified.date = habit.date;
    habitModified.description = habit.description;
    habitModified.status = habit.status;

    this.dataHabitsService.update_habit(indice, habit);
  }

  eliminar_habito (indice: number){
    this.habits.splice(indice, 1);
    this.dataHabitsService.delete_habit(indice);
    this.dataHabitsService.save_habit(this.habits);
  }

  obtener_habitos (){
    return this.dataHabitsService.cargar_habit();
  }

  set_habitos (misHabitos: habitModel[]){
    this.habits = misHabitos;
  }
  
}
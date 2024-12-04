import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { habitModel } from '../../models/habit-form.model';
import { FormsModule } from '@angular/forms';
import { habitsService } from '../../services/habit-form-services/habit-form.service';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-update-habit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-habit.component.html',
  styleUrl: './update-habit.component.css'
})
export class UpdateHabitComponent implements OnInit{

  @Input() habitosLista: habitModel;
  @Input() indice: number;

  volverHome(){
    this.router.navigate(['listHabits']);
  }

  habitos: habitModel[];
  cuadroHabitName: string = "";
  cuadroGoal: number;
  cuadroDate: Date;
  cuadroDescription: string;
  habitStatus: boolean = false;
  maxDate: string;
  accion: number;
  uid: string;

  constructor(private router: Router, private habitsService: habitsService, private route: ActivatedRoute, private loginService: LoginService) {
    this.loginService.getUid().subscribe(
      (uid) => {
        this.uid = String(uid);
      }
    )
  }

  ngOnInit(): void {
      this.accion = parseInt(this.route.snapshot.queryParams['accion']);
      this.indice = this.route.snapshot.params['id'];
      let habito: habitModel = this.habitsService.encontrar_habitos(this.indice);
      this.cuadroHabitName = habito.habitName;
      this.cuadroGoal = habito.goal;
      this.cuadroDate = habito.date;
      this.cuadroDescription = habito.description;
  }

  accion_habito() {
    if(this.accion == 1){
    let miHabito = new habitModel (
      this.cuadroHabitName,
      this.cuadroGoal,
      this.cuadroDate, 
      this.cuadroDescription,
      this.habitStatus,
      this.uid
    );
    this.habitsService.actualizar_habito(this.indice, miHabito);
  } else {
    this.habitsService.eliminar_habito(this.indice);
  }
  setTimeout(() => {
    this.router.navigate(['listHabits']);
    
  }, 500);
}

}

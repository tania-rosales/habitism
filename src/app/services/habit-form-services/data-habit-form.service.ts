import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { habitModel } from "../../models/habit-form.model";
import { LoginService } from "../login.service";

@Injectable({
  providedIn: 'root'
})

export class DataHabitsServices {
  private token: string;
  private urlDB: string;

  constructor (private httpClient: HttpClient, private loginService: LoginService){
    this.token = this.loginService.getIdToken();
    this.urlDB = `https://habitism-85fa5-default-rtdb.firebaseio.com/habits`;
  }


  save_habit(habit: habitModel[]){
    this.httpClient.put(`${this.urlDB}.json?auth=${this.token}`, habit).subscribe(
      () => console.log("Se han guardado el hábito en Firebase"),
      error => console.log('Error: ' + error)
    );
  }

  cargar_habit() {
    return this.httpClient.get(`${this.urlDB}.json?auth=${this.token}`)
  }

  update_habit(indice: number, habit: habitModel) {
    const url = `${this.urlDB}/${indice}.json?auth=${this.token}`;
    this.httpClient.put(url, habit).subscribe(
      () => console.log("Se ha actualizado el habito"),
      error => console.log("Error: " + error)
    );
  }

  delete_habit(indice: number) {
    const url = `${this.urlDB}/${indice}.json?auth=${this.token}`;
    this.httpClient.delete(url).subscribe(
      () => console.log("Se ha eliminado el habito"),
      error => console.log("Error: " + error)
    );
  }

}
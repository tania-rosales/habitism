import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginService } from "../login.service";

@Injectable({
  providedIn: 'root',
})
export class DataAchievedService {
  private token: string;
  private urlDB: string;

  constructor(private httpClient: HttpClient, private loginService: LoginService) {
    this.token = this.loginService.getIdToken();
    this.urlDB = `https://habitism-85fa5-default-rtdb.firebaseio.com/achieved`;
  }

  saveAchieved(achievedData: any) {
    this.httpClient.put(`${this.urlDB}.json?auth=${this.token}`, achievedData).subscribe(
      () => console.log("Se han guardado los días chequeados en Firebase"),
      (error) => console.log("Error: " + error)
    );
  }

  loadAchieved() {
    return this.httpClient.get(`${this.urlDB}.json?auth=${this.token}`);
  }

  updateAchieved(habitId: string, achievedData: any) {
    const url = `${this.urlDB}/${habitId}.json?auth=${this.token}`;
    this.httpClient.put(url, achievedData).subscribe(
      () => console.log("Se ha actualizado el progreso del hábito"),
      (error) => console.log("Error: " + error)
    );
  }

  deleteAchieved(habitId: string) {
    const url = `${this.urlDB}/${habitId}.json?auth=${this.token}`;
    this.httpClient.delete(url).subscribe(
      () => console.log("Se ha eliminado el progreso del hábito"),
      (error) => console.log("Error: " + error)
    );
  }
}

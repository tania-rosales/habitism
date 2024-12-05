import { Injectable } from "@angular/core";
import { DataAchievedService } from "./data-achieve.service";

@Injectable({
  providedIn: 'root',
})
export class AchievedService {
  achievedData: { [habitId: string]: number[] } = {};

  constructor(private dataAchievedService: DataAchievedService) {}

  saveAchieved(habitId: string, days: number[]) {
    this.achievedData[habitId] = days;
    this.dataAchievedService.saveAchieved(this.achievedData);
  }

  updateAchieved(habitId: string, day: number) {
    if (!this.achievedData[habitId]) {
      this.achievedData[habitId] = [];
    }

    // Agregar o quitar día chequeado
    const dayIndex = this.achievedData[habitId].indexOf(day);
    if (dayIndex > -1) {
      this.achievedData[habitId].splice(dayIndex, 1);
    } else {
      this.achievedData[habitId].push(day);
    }

    this.dataAchievedService.updateAchieved(habitId, this.achievedData[habitId]);
  }

  loadAchieved() {
    this.dataAchievedService.loadAchieved().subscribe((data: any) => {
      this.achievedData = data || {};
    });
  }

  getAchievedForHabit(habitId: string) {
    return this.achievedData[habitId] || [];
  }

  compareGoal(habitId: string, goal: number): boolean {
    const achievedDays = this.achievedData[habitId]?.length || 0;
    return achievedDays >= goal;
  }
}

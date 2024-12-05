import { Component, Input, OnInit } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';
import { habitModel } from '../../models/habit-form.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-habit-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './habit-card.component.html',
  styleUrls: ['./habit-card.component.css']
})
export class HabitCardComponent implements OnInit {
  @Input() habit: any; // Datos del hábito pasados desde el componente padre
  calendar: any[][] = [];
  currentMonth: number = 0;
  currentYear: number = 0;
  monthName: string = '';
  daysOfWeek: string[] = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  checkedDays: Set<string> = new Set(); // Días seleccionados en la card
  checkedDaysCount: number = 0; // Contador de días chequeados

  constructor(private calendarService: CalendarService) {}

  ngOnInit(): void {
    this.currentYear = this.calendarService.getCurrentYear();
    this.currentMonth = this.calendarService.getCurrentMonth();
    this.loadCalendar();
  }

  loadCalendar(): void {
    this.calendar = this.calendarService.getCalendar(
      this.currentMonth,
      this.currentYear
    );
    this.monthName = this.calendarService.getMonthName(this.currentMonth);
    this.updateCheckedDaysCount(); // Actualizar el contador al cargar el calendario
  }

  changeMonth(offset: number): void {
    this.currentMonth += offset;

    // Ajustar mes y año
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }

    this.loadCalendar();
  }

  toggleDay(day: number | null): void {
    if (!day) return;

    const dayKey = `${this.currentYear}-${this.currentMonth + 1}-${day}`;
    if (this.checkedDays.has(dayKey)) {
      this.checkedDays.delete(dayKey);
      this.checkedDaysCount--; // Disminuir el contador si se desmarca el día
    } else {
      this.checkedDays.add(dayKey);
      this.checkedDaysCount++; // Aumentar el contador si se marca el día
    }
  }

  isDayChecked(day: number | null): boolean {
    if (!day) return false;

    const dayKey = `${this.currentYear}-${this.currentMonth + 1}-${day}`;
    return this.checkedDays.has(dayKey);
  }

  updateCheckedDaysCount(): void {
    // Inicializar el contador de días chequeados al cargar el calendario
    this.checkedDaysCount = this.checkedDays.size;
  }
}

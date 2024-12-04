import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  // Generar estructura de calendario para un mes
  getCalendar(month: number, year: number): any[][] {
    const firstDay = new Date(year, month, 1).getDay(); // Día inicial del mes (0 = Domingo)
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Total de días en el mes
    const calendar: any[][] = []; // Tabla de semanas
    let currentDay = 1;

    // Crear filas (semanas)
    for (let week = 0; week < 6; week++) {
      const weekRow: (number | null)[] = [];

      // Crear celdas (días)
      for (let day = 0; day < 7; day++) {
        if ((week === 0 && day < firstDay) || currentDay > daysInMonth) {
          weekRow.push(null); // Día vacío (fuera del mes)
        } else {
          weekRow.push(currentDay++);
        }
      }
      calendar.push(weekRow);

      if (currentDay > daysInMonth) break; // Terminar si ya no hay más días
    }

    return calendar;
  }

  // Nombre del mes
  getMonthName(month: number): string {
    return new Date(0, month).toLocaleString('default', { month: 'long' });
  }

  // Año actual
  getCurrentYear(): number {
    return new Date().getFullYear();
  }

  // Mes actual
  getCurrentMonth(): number {
    return new Date().getMonth();
  }
}

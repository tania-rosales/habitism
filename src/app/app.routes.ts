import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HabitFormComponent } from './components/habit-form/habit-form.component';
import { HabitListComponent } from './components/habit-list/habit-list.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ErrorPersonalizadoComponent } from './components/error-personalizado/error-personalizado.component';
import { ProgressComponent } from './components/progress/progress.component';
import { StatisticsComponent } from './components/statistics/statistics.component';

export const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "newHabit", component: HabitFormComponent},
  {path: "listHabits", component: HabitListComponent},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "progress", component: ProgressComponent},
  {path: "statistics", component: StatisticsComponent},
  {path: "**", component: ErrorPersonalizadoComponent}
];

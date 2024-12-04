import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HabitFormComponent } from './components/habit-form/habit-form.component';
import { HabitListFatherComponent } from './components/habit-list-father/habit-list-father.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ErrorPersonalizadoComponent } from './components/error-personalizado/error-personalizado.component';
import { ProgressComponent } from './components/progress/progress.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { FrontpageComponent } from './components/frontpage/frontpage.component';
import { UpdateHabitComponent } from './components/update-habit/update-habit.component';
import { LoginGuardian } from './components/login/login-guardian';

export const routes: Routes = [
  {path: "", component: HomeComponent, canActivate: [LoginGuardian]},
  {path: "newHabit", component: HabitFormComponent, canActivate: [LoginGuardian]},
  {path: "listHabits/newHabit", component: HabitFormComponent, canActivate: [LoginGuardian]},
  {path: "listHabits", component: HabitListFatherComponent, canActivate: [LoginGuardian]},
  {path: "progress", component: ProgressComponent, canActivate: [LoginGuardian]},
  {path: "statistics", component: StatisticsComponent, canActivate: [LoginGuardian]},
  {path: "listHabits/updateHabit/:id", component: UpdateHabitComponent, canActivate: [LoginGuardian]},
  {path: "frontpage", component: FrontpageComponent},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "**", component: ErrorPersonalizadoComponent}
];

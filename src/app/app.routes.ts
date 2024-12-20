import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HabitFormComponent } from './components/habit-form/habit-form.component';
import { HabitListFatherComponent } from './components/habit-list-father/habit-list-father.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ErrorPersonalizadoComponent } from './components/error-personalizado/error-personalizado.component';
import { FrontpageComponent } from './components/frontpage/frontpage.component';
import { UpdateHabitComponent } from './components/update-habit/update-habit.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { LoginGuardian } from './components/login/login-guardian';
import { HabitCardComponent } from './components/habit-card/habit-card.component';

export const routes: Routes = [
  {path: "", component: HomeComponent, canActivate: [LoginGuardian]},
  {path: "newHabit", component: HabitFormComponent, canActivate: [LoginGuardian]},
  {path: "listHabits/newHabit", component: HabitFormComponent, canActivate: [LoginGuardian]},
  {path: "listHabits", component: HabitListFatherComponent, canActivate: [LoginGuardian]},
  {path: "calendar", component: CalendarComponent, canActivate: [LoginGuardian]},
  {path: "habitCard", component: HabitCardComponent, canActivate: [LoginGuardian]},
  {path: "listHabits/updateHabit/:id", component: UpdateHabitComponent, canActivate: [LoginGuardian]},
  {path: "frontpage", component: FrontpageComponent},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "**", component: ErrorPersonalizadoComponent}
];

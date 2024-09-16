import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home/home.component';
import { LoginComponent } from './pages/login/login/login.component';
import { isLoggedInGuard } from './core/guards/is-logged-in.guard';

export const routes: Routes = [
  {path:'', component:LoginComponent },
  {path:'home', component:HomeComponent, canActivate:[isLoggedInGuard] }
];

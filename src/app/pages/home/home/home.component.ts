import { Component } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { DrawerComponent } from "../../../components/drawer/drawer/drawer.component";
import { IndexAutorsComponent } from "../../autors/index/indexAutors/index-autors/index-autors.component";
import { CommonModule } from '@angular/common';
import { ModuleService } from '../../../core/services/module.service';
import { IndexLibrosComponent } from "../../libros/index/index-libros/index-libros.component";
import { CovidDashboardComponent } from "../../covidDashboard/covid-dashboard/covid-dashboard.component";
import {MatButtonModule} from '@angular/material/button';
import { AuthServiceService } from '../../../core/services/auth/authService.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NzLayoutModule, DrawerComponent, IndexAutorsComponent, CommonModule, IndexLibrosComponent, CovidDashboardComponent,MatButtonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  activeComponent$;
  menuItems$;

  constructor(private menuService: ModuleService, private _authService:AuthServiceService,
    private router:Router, private cookieService:CookieService
  ) {
    this.activeComponent$ = this.menuService.activeComponent$;
    this.menuItems$ = this.menuService.menuItems$;
  }

  logOut(){
    this._authService.logout().subscribe({
      next:(data)=>{
        //console.log(data);
        this.cookieService.deleteAll();
        this.router.navigate(['']);
      },error:(error)=>{
        console.error(error);
      }
    });
  }

}

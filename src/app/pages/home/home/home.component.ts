import { Component } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { DrawerComponent } from "../../../components/drawer/drawer/drawer.component";
import { IndexAutorsComponent } from "../../autors/index/indexAutors/index-autors/index-autors.component";
import { CommonModule } from '@angular/common';
import { ModuleService } from '../../../core/services/module.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NzLayoutModule, DrawerComponent, IndexAutorsComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  activeComponent$;
  menuItems$;

  constructor(private menuService: ModuleService) {
    this.activeComponent$ = this.menuService.activeComponent$;
    this.menuItems$ = this.menuService.menuItems$;
  }
}

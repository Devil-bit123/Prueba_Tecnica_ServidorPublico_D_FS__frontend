import { Component, OnInit, OnDestroy } from '@angular/core';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';

import { Modules } from '../../../core/interfaces/modules';
import { Subscription } from 'rxjs';
import { ModuleService } from '../../../core/services/module.service';
import { AuthServiceService } from '../../../core/services/auth/authService.service';
import { UserResponse } from '../../../core/interfaces/UserResponse';
import { PermissionDirective } from '../../../core/directives/permission.directive';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [NzDrawerModule, NzButtonModule, CommonModule,PermissionDirective],
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css'],
})
export class DrawerComponent implements OnInit, OnDestroy {
  menuItems: Modules[] = [];

  permissionsArray: string[] = [];
  private menuItemsSubscription: Subscription = new Subscription();
  module: string = 'modulo'; // Asigna el valor adecuado
  permission: string = 'browse_'; // Asigna el valor adecuado

  constructor(
    private menuService: ModuleService,
    private _authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.obtainUserInfo();
  }

  obtainUserInfo() {
    this.menuItemsSubscription = this.menuService.menuItems$.subscribe(
      (items) => {
        this.menuItems = items;
        //console.log('sss',this.menuItems);
      }
    );
  }

  visible = false;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  ngOnDestroy(): void {
    this.menuItemsSubscription.unsubscribe();
  }

  toggleVisibility(itemName: string): void {
    //console.log(itemName);
    this.menuService.toggleVisibility(itemName);
  }

}

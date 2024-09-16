// import { Directive, Input, OnInit, ViewContainerRef, TemplateRef } from '@angular/core';
// import { AuthServiceService } from '../services/auth/authService.service';
// import { UserResponse } from '../interfaces/UserResponse';

// @Directive({
//   selector: '[appPermission]',
//   standalone: true
// })
// export class PermissionDirective implements OnInit {

//   @Input('appPermission') permission: string = "";
//   user?: UserResponse;
//   permissionsArray: string[] = [];

//   constructor(
//     private _userPermissions: AuthServiceService,
//     private viewContainerRef: ViewContainerRef,
//     private templateRef: TemplateRef<any>
//   ) {}

//   ngOnInit(): void {
//     this.getUserPermissions();
//     this.checkPermission();
//   }

//   getUserPermissions(): void {
//     this._userPermissions.userInfo().subscribe({
//       next: (data) => {
//         this.user = data;
//         this.permissionsArray = data.user.permissions;
//       },
//       error: (error) => {
//         console.error(error);
//       }
//     });
//   }

//   checkPermission(): void {
//     if (this.permissionsArray.includes(this.permission)) {
//       //console.log('tiene permiso');
//       this.viewContainerRef.createEmbeddedView(this.templateRef);
//     } else {
//       //console.log('no tiene permiso');
//       this.viewContainerRef.clear();
//     }
//   }

// }



import { Directive, Input, OnInit, ViewContainerRef, TemplateRef } from '@angular/core';
import { AuthServiceService } from '../services/auth/authService.service';
import { UserResponse } from '../interfaces/UserResponse';

@Directive({
  selector: '[appPermission]',
  standalone: true
})
export class PermissionDirective implements OnInit {

  @Input('appPermission') permission: string = "";
  private user?: UserResponse;
  private permissionsArray: string[] = [];
  private isChecked: boolean = false;

  constructor(
    private _userPermissions: AuthServiceService,
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) {}

  ngOnInit(): void {
    this.loadUserFromCookie();
  }

  private loadUserFromCookie(): void {
    const user = this._userPermissions.getUserFromCookie();
    if (user) {
      this.permissionsArray = user.user.permissions;
      this.checkPermission();
    } else {
      this._userPermissions.getUserInfoAndSaveToCookie(); // Carga y guarda la información si no está disponible en la cookie
    }
  }

  private checkPermission(): void {
    if (this.permissionsArray.includes(this.permission)) {
      //console.log('tiene permiso');
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      //console.log('no tiene permiso');
      this.viewContainerRef.clear();
    }
  }

}

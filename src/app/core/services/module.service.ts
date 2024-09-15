import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Modules } from '../interfaces/modules';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  public http = inject(HttpClient);
  private baseUrl: string = environment.apiUrl;

  public newMenu = new BehaviorSubject<Modules[]>([]);
  private activeComponentSource = new BehaviorSubject<string>('');

  menuItems$ = this.newMenu.asObservable();
  activeComponent$ = this.activeComponentSource.asObservable();

  constructor() {}

  toggleVisibility(itemName: string): void {
    // Desactiva cualquier opción visible y activa la seleccionada en un solo paso
    const updatedMenuItems = this.newMenu.value.map(item => ({
      ...item,
      visibilityStatus: item.name === itemName ? 'true' : 'false'
    }));

    // Actualiza el estado del menú con los cambios
    this.newMenu.next(updatedMenuItems);

    // Actualiza el componente activo
    const activeItem = updatedMenuItems.find(
      (item) => item.visibilityStatus === 'true'
    );
    this.activeComponentSource.next(activeItem ? activeItem.name : '');
  }

  GetModulesFromDb(): Observable<Modules[]> {
    return this.http.get<Modules[]>(`${this.baseUrl}modules`).pipe(
      catchError(error => {
        console.error('Error fetching modules:', error);
        return throwError(() => new Error('Failed to fetch modules'));
      })
    );
  }

  // GetModulesFromDb(): Observable<Modules[]> {
  //   return this.http.get<Modules[]>(`${this.baseUrl}modules`).pipe(
  //     tap((modules: any) => console.log('Modules fetched:', modules)),  // Log de los módulos obtenidos
  //     catchError(error => {
  //       console.error('Error fetching modules:', error);
  //       return throwError(() => new Error('Failed to fetch modules'));
  //     })
  //   );
  // }

}

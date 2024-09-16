import { inject, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Modules } from '../interfaces/modules';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

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

  constructor() {
    // Llama a la API y carga los datos al inicializar el servicio
    this.loadModules();
  }

  private loadModules(): void {
    this.GetModulesFromDb().subscribe(
      items => this.newMenu.next(items),
      error => console.error('Error loading modules:', error)
    );
  }

  toggleVisibility(itemName: string): void {
    const updatedMenuItems = this.newMenu.value.map(item => ({
      ...item,
      visibilityStatus: item.name === itemName ? 'true' : 'false'
    }));
    this.newMenu.next(updatedMenuItems);
    const activeItem = updatedMenuItems.find(item => item.visibilityStatus === 'true');
    this.activeComponentSource.next(activeItem ? activeItem.name : '');
  }

  GetModulesFromDb(): Observable<Modules[]> {
    return this.http.get<Modules[]>(`${this.baseUrl}modules`).pipe(
      catchError(error => {
        console.error('Error fetching modules:', error);
        return of([]); // Retorna un array vacío en caso de error
      })
    );
  }
}

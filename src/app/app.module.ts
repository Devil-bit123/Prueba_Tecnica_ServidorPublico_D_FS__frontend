import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

// Aquí importas cualquier servicio global que necesites
import { AppRoutingModule } from './app-routing.module'; // Si tienes un módulo de rutas

// Importa tus componentes standalone aquí si es necesario
import { AppComponent } from './app.component';
import { UserPermissionsDirective } from './core/directives/userPermissions.directive';

@NgModule({
  declarations: [
    // Declara componentes no standalone aquí, si los hay
  ],
  imports: [


    UserPermissionsDirective

  ],
  providers: [
    // Agrega servicios globales aquí
  ],
  bootstrap: [] // El componente raíz que arranca la aplicación
})
export class AppModule { }

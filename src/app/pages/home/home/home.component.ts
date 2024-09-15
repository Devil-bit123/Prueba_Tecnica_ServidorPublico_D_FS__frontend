import { Component, OnInit } from '@angular/core';
import { ModuleService } from '../../../core/services/module.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  /**
   *
   */
  constructor(private moduleService: ModuleService) {


  }

  ngOnInit(): void {
    this.moduleService.GetModulesFromDb().subscribe({
      next: (modules) => {
        console.log('Modules fetched:', modules);  // Log de los módulos obtenidos
      },
      error: (err) => {
        console.error('Error while fetching modules:', err);
      }
    });
  }

}

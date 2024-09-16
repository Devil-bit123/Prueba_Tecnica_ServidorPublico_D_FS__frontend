import { NzCardModule } from 'ng-zorro-antd/card';

import { AfterViewInit, Component, inject, ViewChild,ChangeDetectionStrategy } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AutoresService } from '../../../../../core/services/autores/autores.service';
import { Autores } from '../../../../../core/interfaces/autores';
import { PermissionDirective } from '../../../../../core/directives/permission.directive';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormAutorComponent } from '../../../formAutor/form-autor/form-autor.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
@Component({
  selector: 'app-index-autors',
  standalone: true,
  imports: [
    NzCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    PermissionDirective,
    NzButtonModule,
    MatDialogModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './index-autors.component.html',
  styleUrl: './index-autors.component.css',
})
export class IndexAutorsComponent {
  displayedColumns: string[] = ['id', 'nombres', 'fechaNacimiento', 'acciones'];
  dataSource = new MatTableDataSource<Autores>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  readonly dialog = inject(MatDialog);

  constructor(private _autorService: AutoresService) {
    this.getAutores();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAutores() {
    this._autorService.GetAutores().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        //console.log(this.dataSource.data);
      },
      error: (error) => {
        console.error('Error fetching authors', error);
      },
    });
  }

  openDialog(action: string, autor?: Autores) {
    const dialogRef = this.dialog.open(FormAutorComponent, {
      data: {
        action: action,
        autor: autor
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result==='correcto'){
        this.getAutores();
      }
    });
  }

}

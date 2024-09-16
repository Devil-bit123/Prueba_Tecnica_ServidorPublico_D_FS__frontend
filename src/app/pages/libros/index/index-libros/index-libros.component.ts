import { Component, inject, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NzCardModule } from 'ng-zorro-antd/card';
import { PermissionDirective } from '../../../../core/directives/permission.directive';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Libro } from '../../../../core/interfaces/libro';
import { LibroService } from '../../../../core/services/libros/libro.service';
import { FormLibroComponent } from '../../formLibro/form-libro/form-libro.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-index-libros',
  standalone: true,
  imports: [    NzCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    PermissionDirective,
    NzButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    CommonModule
  ],
  templateUrl: './index-libros.component.html',
  styleUrl: './index-libros.component.css'
})
export class IndexLibrosComponent {

  displayedColumns: string[] = ['id', 'titulo', 'anio', 'genero','idioma','descripcion','autor','acciones'];
  dataSource = new MatTableDataSource<Libro>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  readonly dialog = inject(MatDialog);

  itsLoading=false

  constructor(private _libroService: LibroService) {
    this.getLibros();
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

  getLibros() {
    this.itsLoading=true;
    this._libroService.GetLibros().subscribe({
      next: (data) => {
        this.itsLoading=false;
        this.dataSource.data = data;
        //console.log(this.dataSource.data);
      },
      error: (error) => {
        console.error('Error fetching authors', error);
      },
    });
  }

  openDialog(action: string, libro?: Libro) {
    const dialogRef = this.dialog.open(FormLibroComponent, {
      data: {
        action: action,
        libro: libro
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
      if (result && result.success) {
        this.getLibros();
      }
    });
  }

}

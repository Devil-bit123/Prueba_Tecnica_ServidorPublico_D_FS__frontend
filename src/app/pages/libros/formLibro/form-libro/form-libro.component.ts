import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Libro } from '../../../../core/interfaces/libro';
import { LibroService } from '../../../../core/services/libros/libro.service';
import moment from 'moment';
import { CommonModule } from '@angular/common';
import { AutoresService } from '../../../../core/services/autores/autores.service';
import { Autores } from '../../../../core/interfaces/autores';
import {MatSelectModule} from '@angular/material/select';
@Component({
  selector: 'app-form-libro',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    CommonModule,
    MatSelectModule
  ],
  templateUrl: './form-libro.component.html',
  styleUrl: './form-libro.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNativeDateAdapter()],
})
export class FormLibroComponent {
  action: string;
  libro?: Libro;
  autores: Autores[] = [];
  form!: FormGroup;
  dialogTitle: string = '';
  buttonSubmit: string = '';

  constructor(
    public dialogRef: MatDialogRef<FormLibroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { action: string; libro?: Libro },
    private fb: FormBuilder,
    private _libroService: LibroService,
    private _autorService: AutoresService
  ) {
    this.action = data.action;
    this.libro = data.libro;

    this.initializeForm();
    this.reciveActionModel();
    this.loadAutores();

    console.log('accion',this.action);
    console.log('libro',this.libro);

  }

  initializeForm(): void {
    // Inicializamos el formulario con validaciones
    this.form = this.fb.group({
      id: ['',],
      titulo: ['', [Validators.required]],
      autor_id: ['', [Validators.required]],
      anio: [
        '',
        [Validators.required],
      ],
      genero: ['', [Validators.required]],
      idioma: ['', [Validators.required]],
      descripcion: ['', [Validators.required, Validators.maxLength(255)]],
    });

    // Si estamos editando, cargamos los datos del libro en el formulario
    if (this.libro) {
      this.form.patchValue({
        titulo: this.libro.titulo,
        autor_id: this.libro.autor_id,
        anio: this.libro.anio,
        genero: this.libro.genero,
        idioma: this.libro.idioma,
        descripcion: this.libro.descripcion,
      });
    }
  }

  reciveActionModel() {
    switch (this.action) {
      case 'add':
        this.dialogTitle = 'Crear libro';
        this.buttonSubmit = 'Agregar';
        break;
      case 'edit':
        this.dialogTitle = 'Editar libro';
        this.buttonSubmit = 'Editar';
        break;
      case 'delete':
        this.dialogTitle = 'Eliminar libro';
        this.buttonSubmit = 'Eliminar';
        this.form.disable();
        break;
      case 'read':
        this.dialogTitle = 'Ver libro';
        this.buttonSubmit = 'OK';
        this.form.disable();
        break;
      default:
        console.log('Acción no reconocida');
        break;
    }
  }

  loadAutores(): void {
    this._autorService.GetAutores().subscribe((autores) => {
      this.autores = autores;
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.form.invalid) return;

    const formValue = this.form.value;
    const libroData: Libro = {
      ...formValue,
      anio: moment(formValue.anio, 'YYYY-MM-DD').format('YYYY-MM-DD'), // Formateamos la fecha
    };

    switch (this.action) {
      case 'add':
        this._libroService.PostLibro(libroData).subscribe(() => {
          this.dialogRef.close({ success: true });
        });
        break;

      case 'edit':
        if (this.libro) {
          this._libroService.PutLibro(this.libro.id, libroData).subscribe(() => {
            this.dialogRef.close({ success: true });
          });
        }
        break;

      case 'delete':
        if (this.libro) {
          this._libroService.DeleteLibro(this.libro.id).subscribe(() => {
            this.dialogRef.close({ success: true });
          });
        }
        break;

        case 'read':

        this.dialogRef.close();

          break;

      default:
        break;
    }
  }
}

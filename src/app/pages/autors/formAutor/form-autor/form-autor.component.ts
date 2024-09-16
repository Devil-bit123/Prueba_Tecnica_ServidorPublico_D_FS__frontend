import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Autores } from '../../../../core/interfaces/autores';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { AutoresService } from '../../../../core/services/autores/autores.service';
import moment from 'moment';
@Component({
  selector: 'app-form-autor',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
  ],
  templateUrl: './form-autor.component.html',
  styleUrl: './form-autor.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNativeDateAdapter()],
})
export class FormAutorComponent {
  action: string;
  autor?: Autores;
  form!: FormGroup;
  dialogTitle: string = '';
  buttonSubmit: string = '';

  constructor(
    public dialogRef: MatDialogRef<FormAutorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { action: string; autor?: Autores },
    private fb: FormBuilder,
    private _autorService: AutoresService
  ) {
    this.action = data.action;
    this.autor = data.autor;

    //console.log('metodo del dialog', this.action);
    //console.log('modelo recibido en el dialogo', this.autor);
    this.initializeForm();
    this.reciveActionModel();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      id: [{ value: this.autor?.id, disabled: this.action === 'read' }],
      nombres: [this.autor?.nombres, Validators.required],
      fechaNacimiento: [this.autor?.fechaNacimiento, Validators.required],
    });
  }

  reciveActionModel() {
    switch (this.action) {
      case 'add':
        this.dialogTitle = 'Crear autor';
        this.buttonSubmit = 'Agregar';
        break;
      case 'edit':
        this.dialogTitle = 'Editar autor';
        this.buttonSubmit = 'Editar';
        break;
      case 'delete':
        this.dialogTitle = 'Eliminar autor';
        this.buttonSubmit = 'Eliminar';
        this.form.disable();
        break;

      case 'read':
        this.dialogTitle = 'Ver autor';
        this.buttonSubmit = 'OK';
        this.form.disable();
        break;

      default:
        console.error('Acción no reconocida');
        break;
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    switch (this.action) {
      case 'add':
        //console.log('voy a guardar');
        var fechaNacimiento = this.form.value.fechaNacimiento;
        var fechaMoment = moment(fechaNacimiento, 'YYYY-MM-DD');
        //console.log(fechaMoment.format("YYYY-MM-DD"));
        var newAutor: Autores = {
          nombres: this.form.value.nombres,
          fechaNacimiento: fechaMoment.format('YYYY-MM-DD'),
        };
        this._autorService.PostAutores(newAutor).subscribe({
          next: (data) => {
            this.dialogRef.close('correcto');
          },
          error: (error) => {
            console.error(error);
          },
        });
        break;

      case 'edit':
        var fechaNacimiento = this.form.value.fechaNacimiento;
        var fechaMoment = moment(fechaNacimiento, 'YYYY-MM-DD');
        //console.log(fechaMoment.format("YYYY-MM-DD"));
        var newAutor: Autores = {
          id: this.form.value.id,
          nombres: this.form.value.nombres,
          fechaNacimiento: fechaMoment.format('YYYY-MM-DD'),
        };
        this._autorService.PutAutores(newAutor.id, newAutor).subscribe({
          next: (data) => {
            this.dialogRef.close('correcto');
          },
          error: (error) => {
            console.error(error);
          },
        });

        break;

      case 'read':
        this.dialogRef.close();
        break;

      case 'delete':
        var fechaNacimiento = this.form.value.fechaNacimiento;
        var fechaMoment = moment(fechaNacimiento, 'YYYY-MM-DD');
        //console.log(fechaMoment.format("YYYY-MM-DD"));
        var newAutor: Autores = {
          id: this.form.value.id,
          nombres: this.form.value.nombres,
          fechaNacimiento: fechaMoment.format('YYYY-MM-DD'),
        };
        this._autorService.DeleteAutor(newAutor.id).subscribe({
          next: (data) => {
            this.dialogRef.close('correcto');
          },
          error: (error) => {
            console.error(error);
          },
        });

        break;

      default:
        break;
    }
  }


}

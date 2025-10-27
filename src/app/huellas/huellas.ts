import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HuellaRequest, HuellaService } from '../services/huellas.services';

@Component({
  selector: 'app-huellas',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './huellas.html',
  styleUrl: './huellas.css'
})

export class CapturaHuellasComponent  {
huellaForm: FormGroup;
  tipoSeleccionado = '';
  plantillaCapturada: string | null = null;

  private fb = inject(FormBuilder);
  private huellaService = inject(HuellaService);
  private snackBar = inject(MatSnackBar);

  constructor() {
    this.huellaForm = this.fb.group({
      tipoUsuario: ['', Validators.required],
      idUsuario: ['', Validators.required]
    });
  }

  onTipoChange(tipo: string): void {
    this.tipoSeleccionado = tipo;
  }

  /** Llama al lector de huellas */
  capturarHuella(): void {
    this.huellaService.capturarHuella().subscribe({
      next: (response) => {
        if (response?.template) {
          this.plantillaCapturada = response.template;
          this.snackBar.open('Huella capturada correctamente ✅', 'Cerrar', { duration: 3000 });
        } else {
          this.snackBar.open('No se recibió la plantilla de huella', 'Cerrar', { duration: 3000 });
        }
      },
      error: (err) => {
        console.error('Error al capturar huella:', err);
        this.snackBar.open('Error al capturar huella ❌', 'Cerrar', { duration: 3000 });
      }
    });
  }

  /** Envía la huella al backend */
  registrarHuella(): void {
    if (!this.plantillaCapturada) {
      this.snackBar.open('Primero debes capturar una huella', 'Cerrar', { duration: 3000 });
      return;
    }

    const formValue = this.huellaForm.value;
    const request: HuellaRequest = {
      idSocios: formValue.tipoUsuario === 'socio' ? Number(formValue.idUsuario) : undefined,
      idEmpleados: formValue.tipoUsuario === 'empleado' ? Number(formValue.idUsuario) : undefined,
      proveedorSensor: 'ZK4500',
      formato: 'ISO',
      datoPlantilla: this.plantillaCapturada!
    };


    this.huellaService.registrarHuella(request).subscribe({
      next: (res) => {
        this.snackBar.open('Huella registrada con éxito 🎉', 'Cerrar', { duration: 3000 });
        this.huellaForm.reset();
        this.plantillaCapturada = null;
      },
      error: (err) => {
        console.error('Error al registrar huella:', err);
        this.snackBar.open('Error al registrar huella ❌', 'Cerrar', { duration: 3000 });
      }
    });
  }
}

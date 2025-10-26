import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { EmpleadoService, Empleado } from '../services/empleado.service';

@Component({
  selector: 'app-registro-personal',
  standalone: true,
  templateUrl: './registro-personal.html',
  styleUrls: ['./registro-personal.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // Material
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class RegistroPersonal {
 registroForm: FormGroup;

  // Inyectar servicios
  private fb = inject(FormBuilder);
  private empleadoService = inject(EmpleadoService);
  private snackBar = inject(MatSnackBar);

  constructor() {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      puesto: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      estado: ['Activo', Validators.required], // Valor por defecto
      fechaIngreso: [new Date(), Validators.required],
      // NOTA: El CodigoEmpleado lo podrías generar en el backend o aquí
      codigoEmpleado: [`EMP-${Date.now()}`] 
    });
  }

  guardarEmpleado(): void {
  if (this.registroForm.invalid) {
    this.snackBar.open('Por favor, completa todos los campos requeridos.', 'Cerrar', { duration: 3000 });
    return;
  }

  // Obtener los datos del formulario
  const nuevoEmpleado: Empleado = {
    ...this.registroForm.value,
    fechaIngreso: this.formatDate(this.registroForm.value.fechaIngreso)
  };

  this.empleadoService.crearEmpleado(nuevoEmpleado).subscribe({
    next: (response) => {
      console.log('Empleado creado:', response);
      this.snackBar.open('¡Empleado registrado con éxito!', 'Cerrar', { duration: 3000 });
      this.registroForm.reset();
    },
    error: (err) => {
      console.error('Error al registrar empleado:', err);
      this.snackBar.open('Error al registrar. Intenta de nuevo.', 'Cerrar', { duration: 3000 });
    }
  });
}

// 👇 Agrega esta función al final de la clase
private formatDate(date: Date): string {
  // Convierte la fecha a formato ISO que el backend acepta
  return new Date(date).toISOString();
}

cancelar(): void { this.registroForm.reset(); }
}
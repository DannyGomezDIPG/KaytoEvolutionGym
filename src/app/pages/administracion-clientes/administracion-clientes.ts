import { Component } from '@angular/core';
import { SocioService } from '../../services/socio.service';


// --- 1. Importaciones necesarias de Angular Material ---
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-administracion-clientes',
  standalone: true, // <-- 2. Declara el componente como standalone
  imports: [ // <-- 3. Añade los módulos que importaste
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './administracion-clientes.html',
  styleUrl: './administracion-clientes.css'
})
export class AdministracionClientes {
socioForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private socioService: SocioService
  ) {
    this.socioForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: [''],
      telefono: [''],
      correo: ['', Validators.email],
      fechaNacimiento: [''],
      estado: [''],
      notas: ['']
    });
  }

  onSubmit(): void {
  if (this.socioForm.valid) {
    const nuevoSocio = this.socioForm.value;
    console.log('Enviando socio:', nuevoSocio);

    this.socioService.addSocio(nuevoSocio).subscribe({
      next: (response) => {
        alert('Cliente registrado correctamente ✅');
        this.socioForm.reset();
      },
      error: (err) => {
        console.error('Error al registrar socio', err);
        alert('Ocurrió un error al registrar el cliente ❌');
      }
    });
  } else {
    alert('Por favor, completa los campos requeridos.');
  }
}

}

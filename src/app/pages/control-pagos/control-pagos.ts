import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { SocioService, Socio } from '../../services/socio.service';
import { PagoService } from '../../services/pago.service';
import { MatIconModule } from '@angular/material/icon'; 

@Component({
  selector: 'app-control-pagos',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatFormFieldModule, MatInputModule,
    MatDatepickerModule, MatNativeDateModule, MatButtonModule, MatSelectModule,
    MatIconModule
  ],
  templateUrl: './control-pagos.html',
  styleUrl: './control-pagos.css'
})
export class ControlPagos implements OnInit {
  // Signals para catálogos
  socios = signal<Socio[]>([]);
  tiposMembresia = signal([
    { id: 1, nombre: 'Visita', precio: 50 },
    { id: 2, nombre: 'Semanal', precio: 150 },
    { id: 3, nombre: 'Mensual', precio: 450 }
  ]);

  // Signal para el formulario
  formPago = signal({
    idSocio: 0,
    idTipoMembresia: 0,
    monto: 0,
    metodoPago: 'Efectivo',
    fechaPago: new Date(),
    referencia: ''
  });

  constructor(
    private socioService: SocioService,
    private pagoService: PagoService
  ) {}

  ngOnInit() {
    this.cargarSocios();
  }

  cargarSocios() {
    this.socioService.getSocios().subscribe(data => this.socios.set(data));
  }

// ... dentro de la clase ControlPagos

// Método para actualizar cualquier campo del formulario sin errores de tipo
actualizarCampo(campo: string, valor: any) {
  this.formPago.update(formulario => ({
    ...formulario,
    [campo]: valor
  }));
}

// Para la membresía seguimos usando el que ya teníamos porque tiene lógica extra
onMembresiaChange(idTipo: number) {
  const tipo = this.tiposMembresia().find(t => t.id === idTipo);
  if (tipo) {
    this.formPago.update(f => ({ 
      ...f, 
      idTipoMembresia: idTipo, 
      monto: tipo.precio 
    }));
  }
}
  guardarPago() {
    const payload = this.formPago();
    if (payload.idSocio === 0 || payload.idTipoMembresia === 0) {
      alert('Por favor completa los campos obligatorios');
      return;
    }

    this.pagoService.registrarPagoCompleto(payload).subscribe({
      next: () => {
        alert('¡Pago y Membresía registrados con éxito!');
        this.resetForm();
      },
      error: (err) => console.error('Error al guardar', err)
    });
  }

  resetForm() {
    this.formPago.set({
      idSocio: 0,
      idTipoMembresia: 0,
      monto: 0,
      metodoPago: 'Efectivo',
      fechaPago: new Date(),
      referencia: ''
    });
  }
}
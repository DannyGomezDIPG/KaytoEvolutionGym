import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-control-clientes',
  standalone: true,
  templateUrl: './control-clientes.html',
  styleUrls: ['./control-clientes.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class ControlClientesComponent {
  filtro: string = '';

  clientes = [
    { nombre: 'Juan Pérez', membresia: 'Mensual', asistencias: 25, ultimaVisita: new Date(2025, 9, 12), estado: 'Activo' },
    { nombre: 'Ana López', membresia: 'Anual', asistencias: 240, ultimaVisita: new Date(2025, 9, 14), estado: 'Activo' },
    { nombre: 'Carlos Ramírez', membresia: 'Mensual', asistencias: 10, ultimaVisita: new Date(2025, 8, 30), estado: 'Inactivo' }
  ];

  columnas = ['nombre', 'membresia', 'asistencias', 'ultimaVisita', 'estado', 'acciones'];

  clientesFiltrados() {
    const term = this.filtro.toLowerCase();
    return this.clientes.filter(c =>
      c.nombre.toLowerCase().includes(term) ||
      c.membresia.toLowerCase().includes(term)
    );
  }

  verDetalle(cliente: any) {
    alert(`Cliente: ${cliente.nombre}\nAsistencias: ${cliente.asistencias}\nÚltima visita: ${cliente.ultimaVisita.toLocaleDateString()}`);
  }

  darDeBaja(cliente: any) {
    const confirmar = confirm(`¿Deseas dar de baja a ${cliente.nombre}?`);
    if (confirmar) {
      cliente.estado = 'Inactivo';
    }
  }
}

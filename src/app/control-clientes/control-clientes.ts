import { Component, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MembresiasService } from '../services/membresias.service';
import { SocioService, Socio } from '../services/socio.service';

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

export class ControlClientesComponent implements OnInit {

  filtro: string = '';
  clientes: Socio[] = [];

  columnas = ['nombre', 'estado', 'acciones'];

  // 👇 NUEVO
  mostrarAsignarMembresia = false;
clienteSeleccionado: any = null;

  constructor(private socioService: SocioService,
              private membresiasService: MembresiasService) {}

tiposMembresia = [
  { idTipoMembresia: 1, nombre: 'Visita', dias: 1 },
  { idTipoMembresia: 2, nombre: 'Semanal', dias: 7 },
  { idTipoMembresia: 3, nombre: 'Mensual', dias: 30 }
];

tipoSeleccionado: any = null;
fechaInicio: Date = new Date();
fechaFin: Date | null = null;


  ngOnInit(): void {
    this.cargarSocios();
  }

  cargarSocios() {
    this.socioService.getSocios().subscribe({
      next: (data) => this.clientes = data,
      error: (err) => console.error('Error al cargar socios', err)
    });
  }

  clientesFiltrados() {
    const term = this.filtro.toLowerCase();
    return this.clientes.filter(c =>
      c.nombre.toLowerCase().includes(term)
    );
  }

abrirAsignarMembresia(cliente: any) {
  this.clienteSeleccionado = cliente;
  this.tipoSeleccionado = null;
  this.fechaInicio = new Date();
  this.fechaFin = null;
  this.mostrarAsignarMembresia = true;
}

onTipoMembresiaChange() {
  if (!this.tipoSeleccionado) return;

  const dias = this.tipoSeleccionado.dias;
  const fin = new Date(this.fechaInicio);
  fin.setDate(fin.getDate() + dias);

  this.fechaFin = fin;
}

guardarMembresia() {
  if (!this.clienteSeleccionado || !this.tipoSeleccionado) {
    alert('Selecciona un tipo de membresía');
    return;
  }

  const payload = {
    idSocio: this.clienteSeleccionado.idSocios,
    idTipoMembresia: this.tipoSeleccionado.idTipoMembresia
  };

  this.membresiasService.asignarMembresia(payload).subscribe({
    next: () => {
      alert('Membresía asignada correctamente');
      this.mostrarAsignarMembresia = false;
    },
    error: (err) => {
      console.error(err);
      alert('Error al asignar membresía');
    }
  });
}


  darDeBaja(cliente: Socio) {
    alert(`Dar de baja a ${cliente.nombre} (pendiente backend)`);
  }

  verDetalle(cliente: Socio) {
    alert(`
Cliente: ${cliente.nombre} ${cliente.apellidoPaterno}
Estado: ${cliente.estado ?? 'N/A'}
`);
  }
}

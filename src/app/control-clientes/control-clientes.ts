import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select'; // Agregado para el combo de estado
import { MatDatepickerModule } from '@angular/material/datepicker'; // Opcional si usas fechas
import { MatNativeDateModule } from '@angular/material/core';
import { MembresiasService } from '../services/membresias.service';
import { SocioService, Socio } from '../services/socio.service';

@Component({
  selector: 'app-control-clientes',
  standalone: true,
  templateUrl: './control-clientes.html',
  styleUrls: ['./control-clientes.css'],
  imports: [
    CommonModule, FormsModule, MatCardModule, MatFormFieldModule,
    MatInputModule, MatTableModule, MatButtonModule, MatIconModule,
    MatSelectModule, MatDatepickerModule, MatNativeDateModule
  ]
})
export class ControlClientesComponent implements OnInit {
  // --- ESTADOS ---
  clientes = signal<Socio[]>([]);
  filtro = signal<string>('');
  
  // Visibilidad de secciones (Independientes para no perder info)
  mostrarFormularioSocio = signal(false);
  mostrarAsignarMembresia = signal(false);
  
  // Datos seleccionados
  clienteSeleccionado = signal<Socio | null>(null);
  socioForm = signal<Socio>(this.inicializarSocio());
  
  columnas = ['nombre', 'telefono', 'estado', 'acciones'];

  // --- FILTRO REACTIVO ---
  clientesEnTabla = computed(() => {
    const term = this.filtro().toLowerCase();
    return this.clientes().filter(c =>
      c.nombre.toLowerCase().includes(term) || 
      c.apellidoPaterno.toLowerCase().includes(term) ||
      (c.correo && c.correo.toLowerCase().includes(term))
    );
  });

  constructor(private socioService: SocioService, 
              private membresiasService: MembresiasService) {}

  ngOnInit(): void {
    this.cargarSocios();
  }

  inicializarSocio(): Socio {
    return {
      nombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      telefono: '',
      correo: '',
      estado: 'Activo',
      notas: '',
      fechaNacimiento: undefined
    };
  }

  cargarSocios() {
    this.socioService.getSocios().subscribe({
      next: (data) => this.clientes.set(data),
      error: (err) => console.error('Error al cargar', err)
    });
  }

  // --- ACCIONES DE SOCIO ---
  abrirFormulario(socio?: Socio) {
    if (socio) {
      // Clonamos para no editar directamente la fila de la tabla
      this.socioForm.set({ ...socio });
    } else {
      this.socioForm.set(this.inicializarSocio());
    }
    this.mostrarFormularioSocio.set(true);
    // No cerramos la otra sección automáticamente a menos que quieras
  }

  guardarSocio() {
    const data = this.socioForm();
    if (data.idSocios) {
      this.socioService.updateSocio(data.idSocios, data).subscribe({
        next: () => {
          this.cargarSocios();
          this.mostrarFormularioSocio.set(false);
          alert('Socio actualizado');
        }
      });
    } else {
      this.socioService.addSocio(data).subscribe({
        next: () => {
          this.cargarSocios();
          this.mostrarFormularioSocio.set(false);
          alert('Socio creado');
        }
      });
    }
  }

  // --- ACCIÓN DE MEMBRESÍA (RECUPERADA) ---
  abrirAsignarMembresia(cliente: Socio) {
    this.clienteSeleccionado.set(cliente); // Guardamos el socio elegido
    this.mostrarAsignarMembresia.set(true);
    // Limpiamos fechas de membresía si tenías esa lógica
  }

  eliminarSocio(id: number | undefined) {
    if (!id) return;
    if (confirm('¿Eliminar definitivamente?')) {
      this.socioService.deleteSocio(id).subscribe(() => this.cargarSocios());
    }
  }
}
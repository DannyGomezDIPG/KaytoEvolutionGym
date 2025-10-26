import { Component } from '@angular/core';

// --- Importaciones necesarias de Angular Material ---
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select'; // <-- Módulo para listas desplegables
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-control-pagos',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSelectModule, // <-- No olvides añadirlo aquí
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './control-pagos.html',
  styleUrl: './control-pagos.css'
})
export class ControlPagos {

}
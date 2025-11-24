import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar'; // Importación de la barra de herramientas
import { MatIconModule } from '@angular/material/icon'; // Importación de íconos
import { MatSidenavModule } from '@angular/material/sidenav'; // Importación del sidenav
import { MatListModule } from '@angular/material/list'; // Importación de las listas
import { VerificacionHuella } from '../verificacion-huella/verificacion-huella'

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule, // Agregado
    MatIconModule, // Agregado
    MatSidenavModule, // Agregado
    MatListModule, // Agregado
    VerificacionHuella
  ],
  templateUrl: './inicio.html',
  styleUrls: ['./inicio.css']
})
export class InicioComponent {}
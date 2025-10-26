import { Routes } from '@angular/router';

import { InicioComponent } from './inicio/inicio';
import { RegistroPersonal } from './registro-personal/registro-personal'; 
import { AdministracionClientes } from './pages/administracion-clientes/administracion-clientes';
import { ControlPagos } from './pages/control-pagos/control-pagos'; 
import { ControlClientesComponent } from './control-clientes/control-clientes';

export const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'registro-personal', component: RegistroPersonal }, 
  { path: 'administracion-clientes', component: AdministracionClientes },
  { path: 'control-pagos', component: ControlPagos },
  { path: 'control-clientes', component: ControlClientesComponent }, // 👈 nuevo

  { path: '**', redirectTo: '/inicio' }
];

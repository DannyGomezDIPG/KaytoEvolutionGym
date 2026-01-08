import { Routes } from '@angular/router';

import { InicioComponent } from './inicio/inicio';
import { RegistroPersonal } from './registro-personal/registro-personal'; 
import { AdministracionClientes } from './pages/administracion-clientes/administracion-clientes';
import { ControlPagos } from './pages/control-pagos/control-pagos'; 
import { ControlClientesComponent } from './control-clientes/control-clientes';
import { CapturaHuellasComponent } from './huellas/huellas';
import { HistorialSocioComponent } from './historial-socio/historial-socio';

export const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'registro-personal', component: RegistroPersonal }, 
  { path: 'administracion-clientes', component: AdministracionClientes },
  { path: 'control-pagos', component: ControlPagos },
  { path: 'control-clientes', component: ControlClientesComponent },
  { path: 'huellas', component: CapturaHuellasComponent },
  { path: 'historial/:id', component: HistorialSocioComponent },
  { path: '**', redirectTo: '/inicio' }
];

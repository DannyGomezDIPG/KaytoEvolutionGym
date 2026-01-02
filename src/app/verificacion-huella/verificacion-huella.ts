import { Component, signal } from '@angular/core'; // Importamos signal
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HuellaService } from '../services/huellas.services';
import { switchMap, timeout, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-verificacion-huella',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule],
  templateUrl: './verificacion-huella.html',
  styleUrl: './verificacion-huella.css'
})
export class VerificacionHuella {
  // Usamos signals para una reactividad más limpia
  estado = signal<'esperando' | 'ok' | 'error'>('esperando');
  mensaje = signal('Coloca tu huella en el lector');
  cargando = signal(false);

  socioNombre = signal<string | null>(null);
  vencimiento = signal<string | null>(null);

  constructor(private huellaService: HuellaService) {}

  verificarHuella() {
    this.cargando.set(true);
    this.estado.set('esperando');
    this.mensaje.set('Iniciando sensor... Coloca tu huella.');

    this.huellaService.capturarHuella().pipe(
      // 1. Damos un margen de 15 segundos para que el usuario ponga la huella
      timeout(15000), 
      // 2. Si hay éxito en captura, pasamos a verificar
      switchMap(resp => {
        this.mensaje.set('Procesando huella...');
        return this.huellaService.verificarHuella(resp.template);
      }),
      // 3. Manejo de errores específico para el flujo
      catchError(err => {
        if (err.name === 'TimeoutError') {
          return of({ error: true, message: 'Tiempo de espera agotado. Intenta de nuevo.' });
        }
        return of({ error: true, message: err.error?.message || 'Error de conexión' });
      })
    )
    .subscribe({
      next: (resp: any) => {
        if (resp.autorizado) {
          this.estado.set('ok');
          this.mensaje.set(resp.mensaje);
          
          // Guardamos la información adicional
          this.socioNombre.set(resp.socio);
          this.vencimiento.set(resp.vence);
        } else {
          this.estado.set('error');
          this.mensaje.set(resp.mensaje || 'Socio no encontrado');
        }
        this.cargando.set(false);
      },
      error: () => {
        this.estado.set('error');
        this.mensaje.set('Error crítico en el sistema');
        this.cargando.set(false);
      }
    });
  }
}
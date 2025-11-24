import { Component } from '@angular/core';
import { HuellaService } from '../services/huellas.services';

@Component({
  selector: 'app-verificacion-huella',
  imports: [],
  templateUrl: './verificacion-huella.html',
  styleUrl: './verificacion-huella.css'
})
export class VerificacionHuella {
mensaje: string = '';
  huellaCapturada: string | null = null;

  constructor(private huellaService: HuellaService) {}

  async capturarHuella() {
    this.mensaje = 'Coloca tu dedo en el lector...';
    
    try {
      // 🔹 Aquí llamas al SDK o API del ZK4500 (ejemplo genérico)
      const resultado = await this.simularCapturaHuella();
      this.huellaCapturada = resultado;
      this.verificarHuella();
    } catch (err) {
      this.mensaje = 'Error al capturar la huella.';
    }
  }

  verificarHuella() {
    if (!this.huellaCapturada) {
      this.mensaje = 'No se detectó huella.';
      return;
    }

    this.huellaService.verificarHuella(this.huellaCapturada).subscribe({
      next: (res) => {
        if (res.encontrado) {
          this.mensaje = `✅ Huella encontrada: ${res.nombre} (${res.tipoUsuario})`;
        } else {
          this.mensaje = '❌ Huella no registrada en el sistema.';
        }
      },
      error: () => this.mensaje = 'Error al verificar la huella.'
    });
  }

  // 🧪 Simulación temporal hasta conectar SDK real
  simularCapturaHuella(): Promise<string> {
    return new Promise(resolve => {
      setTimeout(() => resolve('BASE64_FAKE_TEMPLATE_ABC123'), 2000);
    });
  }
}

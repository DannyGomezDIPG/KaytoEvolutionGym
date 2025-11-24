import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface HuellaRequest {
  idSocios?: number;
  idEmpleados?: number;
  proveedorSensor?: string;
  formato?: string;
  datoPlantilla: string;
}

@Injectable({ providedIn: 'root' })
export class HuellaService {
  private baseUrl = 'http://localhost:5073/api'; // ajusta tu puerto

  constructor(private http: HttpClient) {}

  /** Captura la huella desde el lector ZK4500 */
  capturarHuella(): Observable<any> {
    return this.http.get(`${this.baseUrl}/fingerprint/capture`);
  }

  /** Registra la huella en la base de datos */
  registrarHuella(data: HuellaRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/huellas/registrar`, data);
  }

  verificarHuella(datoPlantilla: string) {
  return this.http.post<{ encontrado: boolean; nombre?: string; tipoUsuario?: string }>(
    `${this.baseUrl}/huellas/verificar`,
    { datoPlantilla }
  );
}

}

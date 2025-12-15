import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AsignarMembresiaRequest {
  idSocio: number;
  idTipoMembresia: number;
}

@Injectable({
  providedIn: 'root'
})
export class MembresiasService {

  private apiUrl = 'https://localhost:5073/api/membresias';

  constructor(private http: HttpClient) {}

  asignarMembresia(data: AsignarMembresiaRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/asignar`, data);
  }

  obtenerTiposMembresia(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tipos`);
  }
}

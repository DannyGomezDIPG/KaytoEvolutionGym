import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Socio {
  idSocios?: number;
  codigoSocio?: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno?: string;
  telefono?: string;
  correo?: string;
  fechaNacimiento?: string;
  estado?: string;
  notas?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SocioService {
  private apiUrl = 'http://localhost:5073/api/Socios'; // ⚠️ Cambia el puerto por el de tu backend

  constructor(private http: HttpClient) {}

  getSocios(): Observable<Socio[]> {
    return this.http.get<Socio[]>(this.apiUrl);
  }

  addSocio(socio: Socio): Observable<Socio> {
    return this.http.post<Socio>(this.apiUrl, socio);
  }

  // Agrega este método a tu clase SocioService
  updateSocio(id: number, socio: Socio): Observable<void> {
  return this.http.put<void>(`${this.apiUrl}/${id}`, socio);
  }

  deleteSocio(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

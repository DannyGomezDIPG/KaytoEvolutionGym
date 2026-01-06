import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PagoService {
  private apiUrl = 'http://localhost:5073/api/Pagos';

  constructor(private http: HttpClient) {}

  registrarPagoCompleto(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registrar-con-membresia`, payload);
  }
}
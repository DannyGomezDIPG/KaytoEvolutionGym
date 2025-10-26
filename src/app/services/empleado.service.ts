import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Empleado {
  idEmpleados?: number;
  codigoEmpleado?: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno?: string;
  puesto?: string;
  telefono?: string;
  correo?: string;
  estado?: string;
  fechaIngreso: string;
  fechaFin?: string | null;
}

@Injectable({
  providedIn: 'root' // ✅ importante
})
export class EmpleadoService {

  private apiUrl = 'http://localhost:5073/api/empleados'; // ajusta si tu backend usa otro puerto

  constructor(private http: HttpClient) {}

  crearEmpleado(empleado: Empleado): Observable<any> {
    return this.http.post(this.apiUrl, empleado);
  }

  obtenerEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.apiUrl);
  }
}

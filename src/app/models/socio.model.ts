export interface Socio {
  IdSocios: number; // Asegúrate de que este nombre coincida con tu modelo de C#
  nombre: string;
  membresia: string; // Asume que tienes una propiedad de membresía.
  asistencias: number; // Asume que tienes una propiedad de asistencias.
  ultimaVisita: Date; // O string, dependiendo de cómo lo devuelva tu API.
  estado: string;
  // Añade cualquier otra propiedad de tu modelo C# que necesites
}
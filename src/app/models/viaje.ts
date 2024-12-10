export interface Viaje {
    id?: string;                // Añadir la propiedad id como opcional
    choferId: string;
    origen: string;
    destino: string;
    fechaHora: string;
    asientosDisponibles: number;
    pasajeros: string[];
    estado: 'abierto' | 'en curso' | 'completado' | 'cancelado';
  }
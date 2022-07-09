import { Empleado } from "./empleado";

export class Task {
    id? : number;
    nombre: string;
    descripcion: string;
    estado: string;
    fechaEjecucion: string;
    diasRetraso: number;
    empleado: Empleado;

}
import { Address } from '../interfaces/interfaces';

export class ConsultSumm{

    constructor(
        public _id: string,   // [1 - 5], tipo de consulta
        public paymentMethod: string,   // efectivo / tarjeta
        public patientName: string,         //Id del paciente
        public orderStatus: number,    // [1 - 2], Precencia/Viertual
        public meeting: string,       // Si es agendada
        public date: string,         // si es para invitado
        public consultReason: string,
        public amount: number,
        public address?: Address,
        public medicalHistory?: any[],
        public patientFile?: any,
        public symptoms?: string[],
    ){}
}
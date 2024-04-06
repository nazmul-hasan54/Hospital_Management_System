import { Patienttests } from "./patienttests";
import { Pntmedicines } from "./pntmedicines";

export class Inptprescriptions {
  constructor(
    public inPtPrescriptionId?: number,
    public addmisonId?: number,
    public isReleased?: boolean,
    public prescriptionDate?: Date,
    public instruction?: string,
    public relase?: boolean,
    public symptroms?: string,
    public pntmedicines?: Pntmedicines[],
    public patienttests?: Patienttests[]

  ) { }
}

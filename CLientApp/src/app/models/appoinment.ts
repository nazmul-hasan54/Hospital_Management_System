import { Data } from "@angular/router";

export class Appoinment {
  constructor(
    public appoinmentId?: number,
    public patientName?: string,
    public age?: number,
    public phone?: number,
    public appointDate?: Date,
    public problem?: string,
    public serialNo?: string,
    public doctorsId?: number
  ) { }
}

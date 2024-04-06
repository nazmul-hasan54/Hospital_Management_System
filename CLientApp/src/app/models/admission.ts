export class Admission {
  constructor(
    public admissionId?: number,
    public patientName?: string,
    public age?: number,
    public phone?: string,
    public email?: string,
    public address?: string,
    public addmissionDate?: Date,
    public problem?: string,
    public isRelase?: boolean,
    public doctorsId?: number,
    public bedId?: number,
    public outPtPresccriptId?: number
  ) { }

  
}

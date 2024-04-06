export class Pntmedicines {
  //[x: string]: number;
  constructor(
    public pntMedicineId?: number,
    public inPtPrescriptionId?: number,
    public medicineListId?: number,
    public quantity?: number,
    public doges?: string
  ) { }
}

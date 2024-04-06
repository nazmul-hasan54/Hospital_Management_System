import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Medicinelists } from '../../../models/medicinelists';
import { MedicinelistsService } from '../../../services/medicinelists.service';
import { NotifyService } from '../../../services/notify.service';

@Component({
  selector: 'app-medicinelists-create',
  templateUrl: './medicinelists-create.component.html',
  styleUrls: ['./medicinelists-create.component.css']
})
export class MedicinelistsCreateComponent implements OnInit {
  medicine: Medicinelists = new Medicinelists();
  medicineForm: FormGroup = new FormGroup({
    medicineName: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required)
  });

  constructor(
    private dataSvc: MedicinelistsService,
    private notifySvc: NotifyService
  ) { }
  get f() {
    return this.medicineForm.controls;
  }
  insert() {
    if (this.medicineForm.invalid) return;
    this.medicine.medicineName = this.f['medicineName'].value;
    this.medicine.price = this.f['price'].value;
    this.dataSvc.insertMedicine(this.medicine)
      .subscribe(r => {
        this.notifySvc.success("Data Inserted successfully!!", "DISMISS");
        this.medicineForm.reset({});
      }, err => {
        this.notifySvc.fail("Fail to save data!!", "DISMISS");
      })
  }
  ngOnInit(): void {

  }

}

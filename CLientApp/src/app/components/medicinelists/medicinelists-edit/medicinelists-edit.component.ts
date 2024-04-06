import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Medicinelists } from '../../../models/medicinelists';
import { MedicinelistsService } from '../../../services/medicinelists.service';
import { NotifyService } from '../../../services/notify.service';

@Component({
  selector: 'app-medicinelists-edit',
  templateUrl: './medicinelists-edit.component.html',
  styleUrls: ['./medicinelists-edit.component.css']
})
export class MedicinelistsEditComponent implements OnInit {
  medicine!: Medicinelists;
  medicineForm: FormGroup = new FormGroup({
    medicineName: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required)
  });

  constructor(
    private dataSvc: MedicinelistsService,
    private notifySvc: NotifyService,
    private activateRoute: ActivatedRoute
  ) { }
  get f() {
    return this.medicineForm.controls;
  }
  update() {
    if (this.medicineForm.invalid) return;
    this.medicine.medicineName = this.f['medicineName'].value;
    this.medicine.price = this.f['price'].value;
    console.log(this.medicine);
    this.dataSvc.updateMedicine(this.medicine)
      .subscribe(r => {
        this.notifySvc.success("Data Updated successfully!!", "DISMISS");
      }, err => {
        this.notifySvc.fail("Fail to update data!!", "DISMISS");
      })
  }

  ngOnInit(): void {

    let id: number = this.activateRoute.snapshot.params['id'];
    this.dataSvc.getMedicineById(id)
      .subscribe(x => {
        this.medicine = x;
        this.medicineForm.patchValue(this.medicine);
      }, err => {
        this.notifySvc.fail("Fail to load cartoon data!!", "DISMISS");
      })
  }

}

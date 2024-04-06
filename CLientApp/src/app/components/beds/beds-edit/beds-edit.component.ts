import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Beds } from '../../../models/beds';
import { Rooms } from '../../../models/rooms';
import { BedsService } from '../../../services/beds.service';
import { NotifyService } from '../../../services/notify.service';
import { RoomsService } from '../../../services/rooms.service';

@Component({
  selector: 'app-beds-edit',
  templateUrl: './beds-edit.component.html',
  styleUrls: ['./beds-edit.component.css']
})
export class BedsEditComponent implements OnInit {
  bed: Beds = new Beds();
  room: Rooms[] = [];
  bedForm: FormGroup = new FormGroup({
    bedNo: new FormControl('', Validators.required),
    bedType: new FormControl('', Validators.required),
    roomId: new FormControl('', Validators.required),
    bedCharge: new FormControl('', Validators.required)
  });
 
  constructor(
    private bedSvc: BedsService,
    private roomSvc: RoomsService,
    private notifySvc: NotifyService,
    private dialog: MatDialog,
    private activateRoute: ActivatedRoute
  ) { }
  get f() {
    return this.bedForm.controls;
  }
  update() {
    if (this.bedForm.invalid) return;
    console.log(this.bedForm.value);

    Object.assign(this.bed, this.bedForm.value);
    console.log(this.bed);

    this.bedSvc.updateBed(this.bed)
      .subscribe(r => {
        console.log(r);
        this.notifySvc.success("Data saved successfully!!", "Dismiss");
        this.bedForm.reset({});
      }, err => {
        this.notifySvc.fail("Fail to save data!!", "Dismiss");
      })
  }

  ngOnInit(): void {
    let id: number = this.activateRoute.snapshot.params['id'];
    this.bedSvc.getBedById(id)
      .subscribe(x => {
        this.bed = x;
        this.bedForm.patchValue(this.bed);
      }, err => {
        this.notifySvc.fail("Fail to load cartoon data!!", "DISMISS");
      })
    this.roomSvc.getRooms()
      .subscribe(r => {
        this.room = r;
      }, err => {
        this.notifySvc.fail("Failed to load admission data!!", "Dismiss");
      })
  }

}

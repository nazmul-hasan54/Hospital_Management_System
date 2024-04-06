import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Beds } from '../../../models/beds';
import { Rooms } from '../../../models/rooms';
import { BedsService } from '../../../services/beds.service';
import { NotifyService } from '../../../services/notify.service';
import { RoomsService } from '../../../services/rooms.service';

@Component({
  selector: 'app-beds-create',
  templateUrl: './beds-create.component.html',
  styleUrls: ['./beds-create.component.css']
})
export class BedsCreateComponent implements OnInit {
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
    private dialog: MatDialog
  ) { }
  get f() {
    return this.bedForm.controls;
  }
  insert() {
    if (this.bedForm.invalid) return;
    console.log(this.bedForm.value);

    Object.assign(this.bed, this.bedForm.value);
    console.log(this.bed);

    this.bedSvc.insertBed(this.bed)
      .subscribe(r => {
        console.log(r);
        this.notifySvc.success("Data saved successfully!!", "Dismiss");
        this.bedForm.reset({});
      }, err => {
        this.notifySvc.fail("Fail to save data!!", "Dismiss");
      })
  }

  ngOnInit(): void {
    this.roomSvc.getRooms()
      .subscribe(r => {
        this.room = r;
      }, err => {
        this.notifySvc.fail("Failed to load admission data!!", "Dismiss");
      })
  }

}

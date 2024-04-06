import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Appoinment } from '../../../models/appoinment';
import { OutPtPresccripts } from '../../../models/out-pt-presccripts';
import { AppoinmentService } from '../../../services/appoinment.service';
import { NotifyService } from '../../../services/notify.service';
import { OutPtPresccriptsService } from '../../../services/out-pt-presccripts.service';

@Component({
  selector: 'app-outptpresccript-create',
  templateUrl: './outptpresccript-create.component.html',
  styleUrls: ['./outptpresccript-create.component.css']
})
export class OutptpresccriptCreateComponent implements OnInit {

  outPtPresccripts: OutPtPresccripts = new OutPtPresccripts();
  appointment: Appoinment[] = [];
  outPtPresccriptForm: FormGroup = new FormGroup({
    medicineName: new FormControl('', Validators.required),
    testName: new FormControl('', Validators.required),
    instruction: new FormControl('', Validators.required),
    admitStatus: new FormControl('', Validators.required),
    appoinmentId: new FormControl('', Validators.required)
    
  })
  constructor(
    private dataSvc: OutPtPresccriptsService,
    private appSvc: AppoinmentService,
    private notifySvc: NotifyService,
    private datePipe: DatePipe
  ) { }

  get f() {
    return this.outPtPresccriptForm.controls;
  }

  insert() {
    if (this.outPtPresccriptForm.invalid) return;

    console.log(this.outPtPresccriptForm.value);

    Object.assign(this.outPtPresccripts, this.outPtPresccriptForm.value);

    console.log(this.outPtPresccripts);

    this.dataSvc.insertOutPtPresccript(this.outPtPresccripts)
      .subscribe(s => {
        console.log(s);
        this.notifySvc.success("Data Inserted Sucessfully", "DISMISS");
        this.outPtPresccriptForm.reset({});
      }, err => {
        this.notifySvc.fail("Fail to save data!!", "DISMISS");
      })
  }
  ngOnInit(): void {
    this.appSvc.getAppoinments()
      .subscribe(r => {
        this.appointment = r;
      }, err => {
        this.notifySvc.fail("Failed to load appoinment data!!", "DISMISS");
      })

  }

}

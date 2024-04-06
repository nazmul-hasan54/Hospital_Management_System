import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Appoinment } from '../../../models/appoinment';
import { OutPtPresccripts } from '../../../models/out-pt-presccripts';
import { AppoinmentService } from '../../../services/appoinment.service';
import { NotifyService } from '../../../services/notify.service';
import { OutPtPresccriptsService } from '../../../services/out-pt-presccripts.service';

@Component({
  selector: 'app-outptpresccript-edit',
  templateUrl: './outptpresccript-edit.component.html',
  styleUrls: ['./outptpresccript-edit.component.css']
})
export class OutptpresccriptEditComponent implements OnInit {

  outPtPresccripts: OutPtPresccripts = new OutPtPresccripts();

  appointment: Appoinment[] = [];
  outPtPresccriptForm: FormGroup = new FormGroup({
    medicineName: new FormControl('', Validators.required),
    testName: new FormControl('', Validators.required),
    instruction: new FormControl('', Validators.required),
    admitStatus: new FormControl(false),
    appoinmentId: new FormControl('', Validators.required)

  });

  constructor(
    private dataSvc: OutPtPresccriptsService,
    private appSvc: AppoinmentService,
    private notifySvc: NotifyService,
  
    private activeRoute: ActivatedRoute
  ) { }
  
  get f() {
    return this.outPtPresccriptForm.controls;
  }
  update() {
    if (this.outPtPresccriptForm.invalid) return;
    console.log(this.outPtPresccriptForm.value);
    Object.assign(this.outPtPresccripts, this.outPtPresccriptForm.value);
    console.log(this.outPtPresccripts);
    this.dataSvc.updateOutPtPresccript(this.outPtPresccripts)
      .subscribe(r => {
        console.log(r);
        this.notifySvc.success("Succeeded to update data", "DISMISS");

      }, err => {
        this.notifySvc.fail("Fail to update data!!", "DISMISS");
      })
  }
  ngOnInit() {

    let id: number = this.activeRoute.snapshot.params['id'];
    console.log(id);
    this.dataSvc.getOutPtPresccriptsById(id)
      .subscribe(s => {
        this.outPtPresccripts = s;
        this.outPtPresccriptForm.patchValue(this.outPtPresccripts);
      }, err => {
        this.notifySvc.fail("Fail to load Prescript data!!", "DISMISS");
      });
    this.appSvc.getAppoinments()
      .subscribe(r => {
        this.appointment = r;
        this.outPtPresccriptForm.patchValue(this.appointment);
      }, err => {
        this.notifySvc.fail("Failed to load appoinment data!!", "DISMISS");
      })
  }

}

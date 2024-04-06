import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TestList } from '../../../models/test-list';
import { NotifyService } from '../../../services/notify.service';
import { TestListService } from '../../../services/test-list.service';

@Component({
  selector: 'app-testlist-edit',
  templateUrl: './testlist-edit.component.html',
  styleUrls: ['./testlist-edit.component.css']
})
export class TestlistEditComponent implements OnInit {
  testList: TestList = new TestList();
  testListtForm: FormGroup = new FormGroup({
    testName: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required)
  })

  constructor(
    private dataSvc: TestListService,
    private notifyService: NotifyService,
    private activeRoute: ActivatedRoute
  ) { }
  get f() {
    return this.testListtForm.controls;
  }
  update() {
    if (this.testListtForm.invalid) return;
    this.testList.testName = this.f['testName'].value;
    this.testList.price = this.f['price'].value;
    this.dataSvc.updateTestList(this.testList)
      .subscribe(r => {
        this.notifyService.success("Data updated Sucessfully", "DISMISS");
        this.testListtForm.reset({});
      }, err => {
        this.notifyService.fail("Data Failed To Saved", "DISMISS");
      })
  }
  ngOnInit(): void {

    let id: number = this.activeRoute.snapshot.params['id'];
    console.log(id);
    this.dataSvc.getTestListById(id)
      .subscribe(x => {
        console.log(x);
        this.testList = x;
        this.testListtForm.patchValue(this.testList);
      }, err => {
        this.notifyService.fail("Fail to load department data!!", "DISMISS");
      })
  }
  

}

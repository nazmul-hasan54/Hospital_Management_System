import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TestList } from '../../../models/test-list';
import { NotifyService } from '../../../services/notify.service';
import { TestListService } from '../../../services/test-list.service';

@Component({
  selector: 'app-testlist-create',
  templateUrl: './testlist-create.component.html',
  styleUrls: ['./testlist-create.component.css']
})
export class TestlistCreateComponent implements OnInit {
  testList: TestList = new TestList();
  testListtForm: FormGroup = new FormGroup({
    testName: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required)
  })
  constructor(
    private dataSvc: TestListService,
    private notifyService: NotifyService
  ) { }
  get f() {
    return this.testListtForm.controls;
  }
  insert() {
    if (this.testListtForm.invalid) return;
    this.testList.testName = this.f['testName'].value;
    this.testList.price = this.f['price'].value;
    this.dataSvc.insertTestList(this.testList)
      .subscribe(r => {
        this.notifyService.success("Data Inserted Sucessfully", "DISMISS");
        this.testListtForm.reset({});
      }, err => {
        this.notifyService.fail("Data Failed To Saved", "DISMISS");
      })
  }
  ngOnInit(): void {

  }

}

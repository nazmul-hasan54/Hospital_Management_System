import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TestList } from '../../models/test-list';
import { NotifyService } from '../../services/notify.service';
import { TestListService } from '../../services/test-list.service';
import { ConfirmDeleteDialogComponent } from '../dialog/confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-testlists',
  templateUrl: './testlists.component.html',
  styleUrls: ['./testlists.component.css']
})
export class TestlistsComponent implements OnInit {
  Testlist: TestList[] = [];
  dataSource: MatTableDataSource<TestList> = new MatTableDataSource(this.Testlist);
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  columnList: string[] = ["testlistId", "testName", "price", "actions"];
  constructor(
    private dataSvc: TestListService,
    private notifySvc: NotifyService,
    private dialog: MatDialog
  ) { }
  confirmDelete(item: TestList) {
    this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '450px'
    }).afterClosed().subscribe(r => {
      if (r) this.dataSvc.deleteTestList(Number(item.testlistId))
        .subscribe(x => {
          this.notifySvc.success("Data deleted", "DISMISS");
          this.dataSource.data = this.dataSource.data.filter(d => d.testlistId != x.testlistId);
        }, err => {
          this.notifySvc.fail("Data delete failed", "DISMISS");
        })
    });
  }
  ngOnInit(): void {
    this.dataSvc.getTestList().
      subscribe(x => {
        this.Testlist = x;
        console.log(x);
        this.dataSource.data = this.Testlist;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, err => {
        this.notifySvc.fail("Failed to load Testlist data", "DISMISS");
      });
  }

}

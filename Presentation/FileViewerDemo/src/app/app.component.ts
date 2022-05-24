import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from './Services/api.service';

export interface FileResponse {
  id: number, name: string, contextType: string, extension: string, alias: string, description: string, createAt: Date
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  dialogref: any;
  title = 'FileViewerDemo';
  displayedColumns: string[] = ['name', 'alias', 'description', 'createAt', 'contextType', 'action'];
  dataSource!: MatTableDataSource<FileResponse>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private dialog: MatDialog,
    private apiService: ApiService) { }

  ngOnInit(): void {
    this.getAllFiles();
  }

  openDialog() {
    this.dialogref = this.dialog.open(DialogComponent, {
      width: '40%',
    });
  }
  getAllFiles() {
    this.apiService.getFilesMetaData().subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res as FileResponse[]);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.log(err);
        alert("Something went horribly wrong!!!")
      }
    });
  }

  updateFile(rowData:any) {
    console.log(rowData);
    this.dialog.open(DialogComponent,{
      width: '40%',
      data:rowData
    });
    this.apiService.getFilesMetaData().subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res as FileResponse[]);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.log(err);
        alert("Something went horribly wrong!!!")
      }
    });
  }
  deleteFile(rowData:any){
    console.log(rowData);
    this.apiService.deleteFileMetaData(rowData.id).subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res as FileResponse[]);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.log(err);
        alert("Something went horribly wrong!!!")
      }
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}




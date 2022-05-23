import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../Services/api.service';

@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

    // Variable to store shortLink from api response
    shortLink: string = "";
    loading: boolean = false; // Flag variable
    file: File = null; // Variable to store file
    fileForm !: FormGroup;
    // Inject service 
    constructor(private apiService: ApiService,
        private formBuilder: FormBuilder, 
        @Inject(MAT_DIALOG_DATA) public updatedData:any,
        private matDialog: MatDialogRef<DialogComponent>) { }

    ngOnInit(): void {
        this.fileForm = this.formBuilder.group({
            alias: ['', Validators.required],
            description: ['', Validators.required]
        })
        if(this.updatedData){
            this.fileForm.controls['alias']=this.updatedData
        }
    }

    // On file Select
    onChange(event) {
        this.file = event.target.files[0];
    }

    // OnClick of button Upload
    onUpload() {
        this.loading = !this.loading;
        this.apiService.fileUpload(this.file, this.fileForm).subscribe(
            {
                next: (res) => {
                    this.loading = false;
                }, error: (err) => {
                    alert("Something went wrong!!!");
                }
            })
            .add(() => { this.matDialog.close(); });
    }
}
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl ,Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../Services/api.service';

interface SelectableType {
    name: string;
    abbreviation: string;
  }
@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.css']
})

  
export class FileUploadComponent implements OnInit {

    loading: boolean = false; 
    file: File = null;
    uploadFileForm : FormGroup;
    actionBtn:string="Upload"
    canUploadFile:boolean=true;

    selectableFileControl = new FormControl('', Validators.required);
    maxFileSizeControl=new FormControl('',Validators.required)
    
 
    selectableTypes: SelectableType[] = [
      {name: 'Comma separated value', abbreviation: '.csv'},
      {name: 'JPEG image', abbreviation: '.jpeg'},
      {name: 'PNG image', abbreviation: '.png'},
      {name: 'Microsoft Excel file', abbreviation: '.xls'},
      {name: 'Microsoft Excel spreadsheet file', abbreviation: '.xlsx'},
      {name: 'Microsoft Word file', abbreviation: '.doc'},
      {name: 'PDF file', abbreviation: '.pdf'},
      {name: 'Rich Text Format', abbreviation: '.rtf'},
      {name: 'Plain text file', abbreviation: '.txt'}
    ];
    // Inject service 
    constructor(private apiService: ApiService,
        private formBuilder: FormBuilder, 
        @Inject(MAT_DIALOG_DATA) public updatedData:any,
        private matDialog: MatDialogRef<DialogComponent>) { }

    ngOnInit(): void {
        this.uploadFileForm = this.formBuilder.group({
            alias: ['', Validators.required],
            description: ['', Validators.required],
            selectedType:this.selectableFileControl,
            maxSize: [Number, Validators.required]
        })

        
        if(this.updatedData){
            this.actionBtn="Update"
            this.canUploadFile=false;
            this.uploadFileForm.controls['alias'].setValue(this.updatedData.alias);
            this.uploadFileForm.controls['description'].setValue(this.updatedData.description);
        }
    }

    // On file Select
    onChange(event) {

        if(event.target.files[0].size <this.uploadFileForm.get("maxSize").value ){
            console.log("file size is okey");
            this.file = event.target.files[0];
            this.uploadFileForm.controls['maxSize'].setErrors(null);
        }else{
            this.uploadFileForm.controls['maxSize'].setErrors({'incorrect': true});
        }
    }

    // OnClick of button Upload
    onUpload() {
        this.loading = !this.loading;
        this.apiService.fileUpload(this.file, this.uploadFileForm).subscribe(
            {
                next: (res) => {
                    this.loading = false;
                }, error: (err) => {
                    alert(err);
                }
            })
            .add(() => { this.matDialog.close(); });
        
    }

    onUpdateData(){
        console.log("On Update data");
        this.apiService.updateFileMetaData(this.uploadFileForm,this.updatedData.id).subscribe(
            {
                next: (res) => {
                    this.uploadFileForm.reset();
                }, error: (err) => {
                    alert(err);
                }
            })
            .add(() => { this.matDialog.close(); });
    }

}
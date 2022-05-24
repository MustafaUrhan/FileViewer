import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
    
  // API url
  baseApiUrl = "https://localhost:7261/api/FileManager"
    
  constructor(private http:HttpClient) { }
  
  // Returns an observable
  upload(file,fileForm):Observable<any> {
  
      // Create form data
      const formData = new FormData(); 
      console.log(file);
      console.log(formData);
      // Store form name as "file" with file data
      formData.append("file", file, file.name);
      formData.append("alias", fileForm.value.alias);
      formData.append("description", fileForm.value.description);
      formData.append("selectedType", fileForm.value.selectedType);
      formData.append("maxSize", fileForm.value.maxSize);
      // Make http post request over api
      // with formData as req
      return this.http.post(this.baseApiUrl, formData)
  }
}
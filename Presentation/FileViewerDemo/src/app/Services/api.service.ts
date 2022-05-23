import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
 // API url
 baseApiUrl = "https://localhost:7261/api/FileManager"
  constructor(private http:HttpClient) { }

  fileUpload(file,fileForm):Observable<any> {
    console.log(file);
    console.log(fileForm);
      const formData = new FormData(); 
      formData.append("file", file, file.name);
      formData.append("alias", fileForm.value.alias);
      formData.append("description", fileForm.value.description);
      return this.http.post(this.baseApiUrl, formData)
  }
  getFiles(){
    return this.http.get(this.baseApiUrl+"/getall");
  }
  updateFile() { }
  
}


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BackendApiService {

  constructor(private http: HttpClient, private cookie: CookieService) { }

  getAllTasksByProjectUnqName(project_unq_name: String) {
    return this.http.get("http://localhost:5000/Project/"+project_unq_name);
  }

  insertNewProject(projectName:string, projectUnqCode:string){
    return this.http.post("http://localhost:5000/Project/"+projectName,{uniquecode:projectUnqCode});
  }

  insertNewTask(taskName:string,description:string){
    return this.http.post("http://localhost:5000/Task/"+taskName,{Description:description,State:1,Puniquecode:this.cookie.get('UnqId')})
  }

}

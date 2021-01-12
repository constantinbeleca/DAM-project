import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BackendApiService } from '../backend-api.service'
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

interface Task {
  ID: number,
  Title: string,
  Description: string,
  State: number
}

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})

export class ProjectComponent implements OnInit {


  title: string;
  new_tasks: Task[];
  in_progress: Task[];
  done: Task[];
  taskName:string;
  description:string;


  constructor(private api: BackendApiService, private cookie: CookieService) { }

  ngOnInit(): void {
    this.api.getAllTasksByProjectUnqName(this.cookie.get('UnqId')).subscribe((data: any[]) => {
      this.new_tasks = data['done'],
        this.in_progress = data['in_working'],
        this.new_tasks = data['new_task'],
        this.title = data['name']
    },
    (err: any)=> {console.log(err)})
  }

  onDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  insertNewTask(){
    this.api.insertNewTask(this.taskName,this.description).subscribe(
      data => {
        console.log("Enter succesfully" + data)
      }
    )
  }

}

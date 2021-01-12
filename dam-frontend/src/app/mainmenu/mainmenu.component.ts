import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CookieService} from 'ngx-cookie-service'
import { BackendApiService } from '../backend-api.service';

@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrls: ['./mainmenu.component.css']
})
export class MainmenuComponent implements OnInit {

  unqCode:string;
  prjName:string;

  constructor(
    private router: Router,
    private cookie: CookieService,
    private api: BackendApiService
    ) 
    { }

  makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


  createNewProject(){
    this.cookie.set("UnqId",this.makeid(8).toString());
    console.log("CEPLM")
    this.api.insertNewProject(this.prjName,this.cookie.get("UnqId")).subscribe(
      data => {
        console.log("Am intrat in createNewprj"+data)
        this.router.navigate(['/Project/'+this.cookie.get("UnqId")])
      }
    )
    
  }

  enterExistingProject(){
    console.log(this.unqCode)
    this.router.navigate(['/Project/'+ this.unqCode])
  }

  ngOnInit(): void {
  }

}

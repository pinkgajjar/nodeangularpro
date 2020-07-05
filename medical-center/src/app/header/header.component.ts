import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';
import{ApiService} from '../api.service';
import { environment } from '../../environments/environment';
import { Location } from '@angular/common';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  url:any;
  baseurl = environment.baseUrl;
  firstname:string;
  profiledata:any;

  
  constructor(private router : Router, public apiService:ApiService, public location:Location) {

   }

  ngOnInit() { 

  
  }
  logout(){
    localStorage.removeItem("profiledata")
    localStorage.removeItem('tokenstore');
    this.router.navigate(['login']);
  }
  

}

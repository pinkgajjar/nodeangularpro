

import { Component, OnInit } from '@angular/core';

import '../../assets/js/bootstrap-show-password.js';
import { Router} from '@angular/router';
import{ApiService} from '../api.service';
import {HttpErrorResponse} from '@angular/common/http';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';



declare var $: any;



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login: any = {};
  dashboardchange : boolean;
  public edited = false;
  arrayvalue;
  userclick:boolean
  resetpsw:string = '';
  displaymsg:string;
  constructor(private router: Router, public apiService:ApiService, private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.dashboardchange = false;
    this.userclick = true;
    this.login.remember = false;

    if(localStorage.getItem("name") !== null || localStorage.getItem("name") !== undefined ){
      this.login.email = sessionStorage.getItem("name");
      console.log(this.login.email);
    }

   
  }


  onSubmit() {
    console.log(this.login.remember);
  
    
    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.login, null, 4));
    this.apiService.login(this.login).subscribe((res)=>{
      console.log(res["status"]);

     
      
      // redirect to the dashboard according to usertype

     
if(res["status"] == "Authenticated") {

  if(this.login.remember){
    sessionStorage.setItem('name', this.login.email);
    
  }
  localStorage.setItem("tokenstore",res["token"])


  this.router.navigate(['/dashboard']); 

  

  
}
else{
  this.arrayvalue = "Either Your UserName or Password is Incorrect";
  this.edited = true;


        setTimeout(function() {
          this.edited = false;
          console.log(this.edited);
        }.bind(this), 5000);
      }
      




    },(err:HttpErrorResponse) => {
      console.log(err)

     

      
   })


  }

  resetpswlink(){
    this.userclick = false;
  }

  gobacktologin(){
    this.userclick = true;
  }
  onSubmitresetpsw(){
    this.spinnerService.show();

    var payload = {
      "email": this.resetpsw
    }

    console.log(payload);
    

  }

}



/////////////////////////

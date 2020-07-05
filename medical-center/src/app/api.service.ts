import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { delay } from "rxjs/operators";
import { environment } from '../environments/environment';


declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class ApiService  {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }


  // login page
  public login(logindata:any)  {
      return this.http.post(this.baseUrl + "login", logindata);
  }

  // latest display project api call 
  public displaydata(){
    return this.http.get( this.baseUrl );
  }
 
  public deletedata(id:Number)
  {
   return this.http.delete( this.baseUrl+"assets"+"/"+id );
  }

  public adddata(assetname:any)
  {

    console.log(assetname);
   return this.http.post( this.baseUrl+"assets",assetname );
  }

  public updatedata(assetname:any)
  {
    return null;
   //return this.http.put( this.baseUrl+"assets",assetname );
  }
}

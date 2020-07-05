import { Injectable } from '@angular/core';
import { array } from '@amcharts/amcharts4/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public username:object;
  public userstring:string;

  public createarray: any;
  constructor() { }

  set user(val: object){
    this.username = val;
  }
  get user():object{
    return this.username;
  }

  set uservalue(val: string){
    this.userstring = val;
  }
  get uservalue():string{
    return this.userstring;
  }

  set arraydata(val){
    this.createarray = val;
  }
  get arraydata():any{
    return this.username;
  }

}

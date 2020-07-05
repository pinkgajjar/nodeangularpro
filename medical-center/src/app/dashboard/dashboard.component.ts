import { Component, OnInit, Input, NgZone ,ViewChild,ElementRef} from '@angular/core';
import { OrderPipe } from 'ngx-order-pipe';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import{ApiService} from '../api.service';
import {HttpErrorResponse} from '@angular/common/http';
import { Router,NavigationEnd} from '@angular/router';




@Component({
  selector: 'ngbd-modal1-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Add Asset</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body popupbody">
    <h4> <b>Enter Asset Name</b>  </h4>
    <input type="text" #assetname name="assetname" placeholder="enter assetname"/>
    </div>
     <div class="modal-footer">
       <button type="button" class="btn btn-outline-dark" (click)="saveasset()">Save</button>
     </div>
  `
})
export class dashboardContent {
  
  @ViewChild('assetname',{ static: false }) myasset: ElementRef;
  @Input() asset:any; 
  mySubscription: any;

  constructor(private router: Router,public activeModal: NgbActiveModal,public apiService:ApiService) {

  }
  saveasset()
  {
    
  this.asset={
     assetname : this.myasset.nativeElement.value
   }
  this.apiService.adddata(this.asset).subscribe((res)=>{
   
      if(res["message"]=="Asset successfully created!")
    {
            alert('Asset created successfully');
            
            location.reload();
        }
    },
    (err:HttpErrorResponse) => {
     console.log(err)
   })
    this.activeModal.close(this.asset);
    
  }



}



@Component({
  selector: 'ngbd-modal1-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Edit Asset</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body popupbody">
    <h4> <b>Edit Asset Name</b>  </h4>
    <input type="text" name="assetname" #assetname value="{{asset.assetname}}" placeholder="edit assetname"/>
    </div>
     <div class="modal-footer">
       <button type="submit" class="btn btn-outline-dark" (click)="saveedit()">Save</button>
     </div>
  `
})


export class dashboardeditContent {
  @ViewChild('assetname',{ static: false }) myasset: ElementRef;
  @Input() asset:any; 
  
  constructor(public activeModal: NgbActiveModal,public apiService:ApiService) {}
  saveedit()
  {
     alert('Asset Updated successfully');
    this.activeModal.close(this.asset);
  }
}


 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  elements : any;
  searchText;
asset:any={};

  headElements = [ 'Assest', 'Status', 'RegistrationDate','Edit','Delete'];
    
  constructor(private router: Router,private orderPipe: OrderPipe, private modalService: NgbModal, public apiService:ApiService, private _zone: NgZone) {

   }
  
  // display assets

  ngOnInit() {
   
    this.apiService.displaydata().subscribe((res)=>{
      console.log(JSON.parse(JSON.stringify(res)));
 
      this.elements=JSON.parse(JSON.stringify(res));
     
    },
    (err:HttpErrorResponse) => {
      console.log(err)
   })


}
// delete asset
deleteasset(element){
  
    this.apiService.deletedata(element._id).subscribe((res)=>{
   
        if(res["status"]=="success")
        {
            alert('Asset deleted successfully');
            location.reload(); 

        }
    },
    (err:HttpErrorResponse) => {
      console.log(err)
    })
   
  }
// add asset
  addasset()
  {
    this.modalService.open(dashboardContent);
  
  }
  editasset(element)
  {
    const modalRef = this.modalService.open(dashboardeditContent);
    modalRef.componentInstance.asset = element;
  }
}
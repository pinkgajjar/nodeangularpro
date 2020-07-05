import { NgModule } from '@angular/core';
import { BrowserModule ,} from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';  //<<<< import it here

import { dashboardContent, dashboardeditContent} from './dashboard.component';

@NgModule({
  imports: [BrowserModule, NgbModule,FormsModule],
  declarations: [dashboardContent,dashboardeditContent],
  exports: [dashboardContent,dashboardeditContent],
  bootstrap: [dashboardContent,dashboardeditContent],
})
export class dashboardComponentModule {}

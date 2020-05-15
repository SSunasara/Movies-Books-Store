import { ToastrModule } from 'ngx-toastr';
import { ProductService } from './shared/services/product.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Error404Component } from './error404/error404.component';


@NgModule({
  declarations: [
    AppComponent,
    Error404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right'
    })
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }

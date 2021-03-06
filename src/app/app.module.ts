import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { NotFoundComponent } from './not-found/not-found.component';
import {AuthModule} from "./auth/auth.module";
import {RouterModule} from "@angular/router";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {ApiCallInterceptor} from "./shared/interceptors/api-call.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    AuthModule,
    RouterModule
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass:HashLocationStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiCallInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

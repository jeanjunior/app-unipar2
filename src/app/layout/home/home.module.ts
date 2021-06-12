import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    HomeRoutingModule,
    ChartsModule
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule { }

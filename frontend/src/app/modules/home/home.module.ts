import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home.routing.module';
import { HomeComponent } from './home.component';
import { StockListTableComponent } from './components/stock-list-table/stock-list-table.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [HomeComponent, HeaderComponent, StockListTableComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
  ]
})

export class HomeModule { }

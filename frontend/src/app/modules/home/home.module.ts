import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home.routing.module';
import { HomeComponent } from './home.component';
import { HeaderComponent } from './components/header/header.component';
import {MatTableModule} from '@angular/material/table';
import { CompanyTableComponent } from './components/company-table/company-table.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { CompanyService } from 'src/app/shared/services/company.service';

@NgModule({
  declarations: [HomeComponent, HeaderComponent, CompanyTableComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [ CompanyService ]
})

export class HomeModule { }

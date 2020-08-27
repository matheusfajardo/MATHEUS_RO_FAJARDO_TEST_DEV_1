import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/shared/services/company.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  companyService: CompanyService;
  companiesWithDeviation: CompanyWithDeviationModel[];

  constructor(_companyService: CompanyService) {
    this.companyService = _companyService;
  }

  getCompaniesWithDeviation() {
    this.companyService.getCompaniesWithDeviation().subscribe( dados => this.companiesWithDeviation = dados );
  }

  ngOnInit() {
  }

}

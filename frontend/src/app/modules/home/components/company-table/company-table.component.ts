import { AfterViewInit, Component, OnInit, ViewChild, Input, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { CompanyTableDataSource, CompanyTableItem } from './company-table-datasource';

@Component({
  selector: 'app-company-table',
  templateUrl: './company-table.component.html',
  styleUrls: ['./company-table.component.scss']
})
export class CompanyTableComponent implements OnInit {
  @Input() companiesWithDeviation: CompanyWithDeviationModel[];
  displayedColumns = ['company', 'segment', 'deviation'];

  ngOnInit() {
  }
  
}

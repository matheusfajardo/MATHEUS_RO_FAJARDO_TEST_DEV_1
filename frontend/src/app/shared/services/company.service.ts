import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable()
export class CompanyService {
  private readonly URL = '/api/company';

  constructor(private http: HttpClient) { }

  getCompaniesWithDeviation() {
    return this.http.get<CompanyWithDeviationModel>(this.URL + '/getCompaniesWithDeviation').pipe(tap(console.log));
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class StockService {
  url = 'http://localhost:8080/stock/index';
  constructor(private http: HttpClient) { }
}

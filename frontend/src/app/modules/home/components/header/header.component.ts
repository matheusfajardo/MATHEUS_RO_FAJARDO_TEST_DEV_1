import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  candidate: String;
  
  constructor() {    
  }

  ngOnInit() {
    this.candidate = "Matheus Rezende de Oliveira Fajardo";
  }

}

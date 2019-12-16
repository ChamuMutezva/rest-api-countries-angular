import { Component, OnInit, ɵɵresolveBody } from '@angular/core';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {
lightMode : boolean = false;
  constructor() { }

  ngOnInit() {
  }

  
  toggleMode(): void {
    this.lightMode = !this.lightMode;
    
  }

}

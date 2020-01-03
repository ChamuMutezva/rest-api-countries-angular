import { Component, OnInit, ɵɵresolveBody, Output, EventEmitter, OnChanges } from '@angular/core';
import { faLightbulb as faSolidLightbulb,  faDollarSign,  IconDefinition
} from "@fortawesome/free-solid-svg-icons";
import { faLightbulb as faRegularLightbulb } from "@fortawesome/free-regular-svg-icons";

import { ThemeService } from '../theme/theme.service';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit, OnChanges {
 message: boolean;
  darkTheme =  new FormControl(false);
  lightMode : boolean = false;

@Output() lightModeToggle: EventEmitter<boolean> = new EventEmitter<boolean>();
 //
  constructor(private themeService : ThemeService) {
   /* this.darkTheme.valueChanges.subscribe(value => {
      if (value) {
        this.themeService.toggleDark();
      } else {
        this.themeService.toggleLight();
      }
    });*/
    
   }
 
  ngOnInit() {
    this.themeService.currentMessage.subscribe(message => this.message = message);
  }

  ngOnChanges(): void {
    this.lightMode = this.lightMode;
  }
  
  toggleMode(): void {
    this.lightMode = !this.lightMode; 
    console.log(this.lightMode);
    console.log(`${this.lightMode} has been clicked`);
    localStorage.setItem("theme", "darkTheme"); 
    this.themeService.changeMessage(this.lightMode); 
   // let outLet = document.querySelector("router-outlet");
    //this.lightModeToggle.emit(this.lightMode);
  }  

 

}

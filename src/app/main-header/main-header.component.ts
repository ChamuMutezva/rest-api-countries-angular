import { Component, OnInit, ɵɵresolveBody } from '@angular/core';
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
export class MainHeaderComponent implements OnInit {
  darkTheme =  new FormControl(false);
  lightMode : boolean = false;
  constructor(private themeService : ThemeService) {
    this.darkTheme.valueChanges.subscribe(value => {
      if (value) {
        this.themeService.toggleDark();
      } else {
        this.themeService.toggleLight();
      }
    });
    
   }
 
  ngOnInit() {
  }

  
  toggleMode(): void {
    this.lightMode = !this.lightMode; 
    localStorage.setItem("theme", "darkTheme");  
    let outLet = document.querySelector("router-outlet");
    console.log(outLet.outerHTML);
  }  

 

}

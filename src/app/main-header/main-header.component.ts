import { Component, OnInit, ɵɵresolveBody } from '@angular/core';
import { faLightbulb as faSolidLightbulb,  faDollarSign,  IconDefinition
} from "@fortawesome/free-solid-svg-icons";
import { faLightbulb as faRegularLightbulb } from "@fortawesome/free-regular-svg-icons";

import { ThemeService } from '../theme/theme.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {

  lightMode : boolean = false;
  constructor(private themeService : ThemeService) { }
 
  ngOnInit() {
  }

  
  toggleMode(): void {
    this.lightMode = !this.lightMode;      
  }  

 

}

import { Component, OnInit } from '@angular/core';
import { CountriesServiceService } from '../countries-service.service';
import { CountriesInterface } from '../countries-interface';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  constructor(private countriesService : CountriesServiceService) { }
  countries: CountriesInterface[] = [] ;
  ngOnInit() {
    this.countriesService.getCountries().subscribe(
      (data) => {
         this.countries = data;
        console.log(this.countries);
        },
      
      (err: any) => console.log(err),
      () => console.log("execution complete")
    )

  }

}

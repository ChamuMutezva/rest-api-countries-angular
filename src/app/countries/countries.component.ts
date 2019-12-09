import { Component, OnInit } from '@angular/core';
import { CountriesServiceService } from '../countries-service.service';
import { CountriesInterface } from '../countries-interface';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  errorMsg: string;
  _countryFilter: string;
  get countryFilter(): string {
    return this._countryFilter;
  }
  set countryFilter(value: string) {
    this._countryFilter = value;
    this.filteredCountries = this.countryFilter ? this.performFilter(this.countryFilter) : this.countries;
  }



  constructor(private countriesService: CountriesServiceService) { }
  countries: CountriesInterface[];
  filteredCountries: CountriesInterface[] = [];
  ngOnInit() {
    this.countriesService.getCountries().subscribe(
      /* (data) => {
          this.countries = data;
         console.log(this.countries);
         },
       
       (err: any) => console.log(err),
       () => console.log("execution complete") */
      countries => {
        this.countries = countries;
        this.filteredCountries = this.countries;

      },
      error => this.errorMsg = <any>error
    );

    /************************************* */


  }

  performFilter(filterBy: string): CountriesInterface[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.countries.filter((country: CountriesInterface) =>
      country.name.toLocaleLowerCase().indexOf(filterBy) !== -1)


  }

}

import { Component, OnInit } from '@angular/core';
import { CountriesServiceService } from '../countries-service.service';
import { CountriesInterface } from '../countries-interface';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
continentList : ["Africa", "America", "Asia", "Europe", "Oceania"];
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
      countries => {
        this.countries = countries;
        this.filteredCountries = this.countries;

      },
      error => this.errorMsg = <any>error
    );

  }

  performFilter(filterBy: string): CountriesInterface[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.countries.filter((country: CountriesInterface) =>
      country.name.toLocaleLowerCase().indexOf(filterBy) !== -1)
  }

  //Fetch countries in a continent
  fetchContinent = () => {
    const apiEndpoint = `https://restcountries.eu/rest/v2/region/africa`;
    fetch(apiEndpoint)
      .then(response => response.json())
      .then(data => {
        console.log(data);
      }).catch(error => console.log(error))
  } 
  //End of fetch continent

  selectByContinent = () => {
    console.log("Continent selected", event.currentTarget);
  }

}

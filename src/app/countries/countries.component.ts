import { Component, OnInit } from '@angular/core';
import { CountriesServiceService } from '../countries-service.service';
import { CountriesInterface } from '../countries-interface';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  continentList: string[] = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
  selectedContinent: string = this.continentList[0];
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
  // to replace 'africa' at the end of apiEndpoint variable with
  // a variable that holds continents
  fetchContinent(continentSelect: any)  {
    const apiEndpoint = `https://restcountries.eu/rest/v2/region/${continentSelect}`;
    fetch(apiEndpoint)
      .then(response => response.json())
      .then(data => {
       // console.log(data);
        let currentData = { ...data };
      this.countries = currentData;
      console.log(this.countries);
        //this.currencies = [];
       // console.log(currentData[0].name);
       // console.log(currentData[0].flag);
      }).catch(error => console.log(error))
  }
  //End of fetch continent

  selectByContinent(event: any) {
    const targetContinent = event.target.value.toLowerCase();
    console.log(targetContinent);
    this.fetchContinent(targetContinent);
  }

}

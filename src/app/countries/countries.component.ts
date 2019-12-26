import { Component, OnInit } from '@angular/core';
import { CountriesServiceService } from '../countries-service.service';
import { CountriesInterface } from '../countries-interface';
import { ActivatedRoute } from '@angular/router';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  continentList: string[] = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];
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



  constructor(private countriesService: CountriesServiceService, private route: ActivatedRoute) { }

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

    /* trial 2 experimental stage

    let continentName: string = this.route.snapshot.params[this.selectedContinent];
    this.countriesService.getCountriesByContinent(continentName).subscribe(
      countries => {
        this.countries = countries;
        this.filteredCountries = this.countries;

      },
      error => this.errorMsg = <any>error
    )
     end of trial 2  experimental stage */
  }

  performFilter(filterBy: string): CountriesInterface[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.countries.filter((country: CountriesInterface) =>
      country.name.toLocaleLowerCase().indexOf(filterBy) !== -1)
  }

  //Fetch countries in a continent
  // to replace 'africa' at the end of apiEndpoint variable with
  // a variable that holds continents
  // trial one
  /* fetchContinent(continentSelect: any) {
     const apiEndpoint = `https://restcountries.eu/rest/v2/region/${continentSelect}`;
     fetch(apiEndpoint)
       .then(response => response.json())
       .then(data => {
         let currentData = { ...data };
         this.countries = currentData;
         console.log(this.countries);       
         console.log(this.filteredCountries);       
          console.log(currentData[0].flag);
       }).catch(error => console.log(error))
   } */


  //End of fetch continent

  selectByContinent(event: any) {
    const targetContinent = event.target.value.toLowerCase();
    console.log(targetContinent);
    //
    // all exp
    if (targetContinent == "all") {
      this.countriesService.getCountries().subscribe(
        countries => {
          this.countries = countries;
          this.filteredCountries = this.countries;
        },
        error => this.errorMsg = <any>error
      );
      return;
    }
    //end of all exp
    let continentName: string = this.route.snapshot.params[targetContinent];
    this.countriesService.getCountriesByContinent(targetContinent).subscribe(
      countries => {
        this.countries = countries;
        this.filteredCountries = this.countries;

      },
      error => this.errorMsg = <any>error
    )
    // this.fetchContinent(targetContinent);
  }

}

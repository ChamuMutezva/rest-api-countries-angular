import { Component, OnInit, Input } from '@angular/core';
import { CountriesServiceService } from '../countries-service.service';
import { CountriesInterface } from '../countries-interface';
import { ActivatedRoute } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { MainHeaderComponent } from '../main-header/main-header.component';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
 
  fasearch = faSearch;
 @Input() lightMode: boolean;  //
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

  }

  performFilter(filterBy: string): CountriesInterface[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.countries.filter((country: CountriesInterface) =>
      country.name.toLocaleLowerCase().indexOf(filterBy) !== -1)
  }

  //Fetch countries in a continent
  // to replace 'africa' at the end of apiEndpoint variable with
  // a variable that holds continents
  selectByContinent(event: any) {
    //a variable for a continent to be searched
    const targetContinent = event.target.value.toLowerCase();
    console.log(targetContinent);
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
    // loop the remaining continents
    let continentName: string = this.route.snapshot.params[targetContinent];
    this.countriesService.getCountriesByContinent(targetContinent).subscribe(
      countries => {
        this.countries = countries;
        this.filteredCountries = this.countries;

      },
      error => this.errorMsg = <any>error
    )
  }

 /* toggleTheme = () => {     
    let outLet = document.querySelector("router-outlet");
    console.log(outLet.innerHTML);
  let themeStatus =  localStorage.getItem("theme");  
  console.log(themeStatus);
  } */
  
  


}

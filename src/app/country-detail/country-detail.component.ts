import { Component, OnInit } from '@angular/core';
import { CountriesServiceService } from '../countries-service.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.css']
})
export class CountryDetailComponent implements OnInit {
  population: number;
  capital: string;
  flag: string;
  region: string;
  subregion: string;
  nativeName: string;
  tld: string;

  alpha3Code: string;
  borders: string[];
  borderingCountries: any = [];

  currencies: string[];
  countryCurrency: string[];
  resultCurrency: any = [];

  languages: string[];
  countryLang: string[];
  resultLang: any = [];

  name = this.route.snapshot.paramMap.get('name');

  constructor(private countryService: CountriesServiceService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.countryService.getCountry(this.name, (resultCountry) => {
      this.population = resultCountry.population;
      this.capital = resultCountry.capital;
      this.flag = resultCountry.flag;
      this.region = resultCountry.region;
      this.subregion = resultCountry.subregion;
      this.tld = resultCountry.topLevelDomain;
      this.currencies = resultCountry.currencies;
      this.languages = resultCountry.languages;
      this.alpha3Code = resultCountry.alpha3Code;
      this.nativeName = resultCountry.nativeName;
      this.borders = resultCountry.borders;

      //curency used 
      this.countryCurrency = { ...this.currencies };
      Object.entries(this.countryCurrency).forEach(item => {
        for (let [key, value] of Object.entries(item[1])) {
          if (key == "name") {
            if (value !== null) {
              console.log(value);
              this.resultCurrency.push(value);
            }

          }
        }
      })

      //languages used
      this.countryLang = { ...this.languages };
      Object.entries(this.countryLang).forEach(lang => {
        for (let [key, value] of Object.entries(lang[1])) {
          if (key == "name") {
            console.log(value);
            this.resultLang.push(value);
          }
        }
      })

      //bordering countries
      if (this.borders.length <= 0) {
        console.log("no surrounding countries");
        return;
      } else {
        console.log("Iterate the surrounding countries");
      }
      console.log(this.alpha3Code);
      this.borders.forEach(border => {
        console.log(border);
        //-----------------------
        //use fetch api to view bordering countries.
        const apiEndpoint = `https://restcountries.eu/rest/v2/alpha/${border}`;

        fetch(apiEndpoint)
          .then(response => response.json())
          .then(data => {
            console.log(data.name);
            this.borderingCountries.push(data.name);
          }).catch(error => console.log(error))
      
        //----------------------------------------
      })
    });


  }

  onBack(): void {
    this.router.navigate(['/countries']);
  }




}

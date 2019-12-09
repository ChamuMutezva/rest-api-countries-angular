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

      this.countryLang = {...this.languages};
      Object.entries(this.countryLang).forEach(lang => {
        for (let [key, value] of Object.entries(lang[1])){
          if (key == "name") {
            console.log(value);
            this.resultLang.push(value);
          }
        }
      })

console.log(this.alpha3Code);
    });


  }

  onBack(): void {
    this.router.navigate(['/countries']);
  }




}

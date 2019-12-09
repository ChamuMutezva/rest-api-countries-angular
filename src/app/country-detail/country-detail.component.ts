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
  tld: string;
  currencies: string[];
  languages: string[];
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
    });


  }

  onBack(): void {
    this.router.navigate(['/countries']);
  }




}

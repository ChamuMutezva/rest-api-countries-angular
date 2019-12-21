import { Component, OnInit } from '@angular/core';
import { CountriesServiceService } from '../countries-service.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.css']
})
export class CountryDetailComponent implements OnInit {
  count: number = 0;
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

  // @HostListener('click', ['event'])


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
      const checkCurrency = () => { //edit in motion
        Object.entries(this.countryCurrency).forEach(item => {
          for (let [key, value] of Object.entries(item[1])) {
            if (key == "name") {
              if (value !== null) {
                // console.log(value);
                this.resultCurrency.push(value);
              }

            }
          }
        })
      }
      checkCurrency(); // edit in motion
      //languages used
      this.countryLang = { ...this.languages };
      Object.entries(this.countryLang).forEach(lang => {
        for (let [key, value] of Object.entries(lang[1])) {
          if (key == "name") {
            // console.log(value);
            this.resultLang.push(value);
          }
        }
      })

      //bordering countries
      if (this.borders.length <= 0) {
        console.log("no surrounding countries");
        return;
      } else {
        // console.log("Iterate the surrounding countries");
      }
      // console.log(this.alpha3Code);
      this.borders.forEach(border => {
        //  console.log(border);
        //-----------------------
        //use fetch api to view bordering countries.
        const apiEndpoint = `https://restcountries.eu/rest/v2/alpha/${border}`;

        fetch(apiEndpoint)
          .then(response => response.json())
          .then(data => {
            // console.log(data.name);
            this.borderingCountries.push(data.name);
          }).catch(error => console.log(error))

        //----------------------------------------
      })
    });


  }

  onBack(): void {
    this.router.navigate(['/countries']);
  }


  //country button functionality
  changeCountry(): any {
    this.count++;
    console.log(event.target);
    console.log(this.count);
    const targetBtn = (event.target as HTMLInputElement).innerHTML.trim();
    console.log(targetBtn);


    const fetchCountry = () => {
      const apiEndpoint = `https://restcountries.eu/rest/v2/name/${targetBtn}`;
      fetch(apiEndpoint)
        .then(response => response.json())
        .then(data => {
          let currentData = { ...data };
          this.currencies = [];
          console.log(currentData[0].name);
          console.log(currentData[0].flag);

          this.name = currentData[0].name;
          this.population = currentData[0].population;
          this.capital = currentData[0].capital;
          this.flag = currentData[0].flag;
          this.region = currentData[0].region;
          this.subregion = currentData[0].subregion;
          this.tld = currentData[0].topLevelDomain;

          this.countryCurrency = currentData[0].currencies;
          console.log(this.countryCurrency);
          const checkCurrency = () => { //edit in motion this is duplicate code
            this.resultCurrency = [];
            Object.entries(this.countryCurrency).forEach(item => {
              for (let [key, value] of Object.entries(item[1])) {
                if (key == "name") {
                  if (value !== null) {
                    // console.log(value);
                    this.resultCurrency.push(value);
                  }

                }
              }
            })
          }
          checkCurrency(); // edit in motion this is duplicate code


          this.countryLang = currentData[0].languages;
          //another duplicate code that needs to be taken care of
          const changeLangs = () => {
            this.resultLang = [];
            Object.entries(this.countryLang).forEach(lang => {
              for (let [key, value] of Object.entries(lang[1])) {
                if (key == "name") {
                  // console.log(value);
                  this.resultLang.push(value);
                }
              }
            })
          }
          changeLangs();
          //this is duplicate code

          this.alpha3Code = currentData[0].alpha3Code;
          this.nativeName = currentData[0].nativeName;
         
          this.borders = currentData[0].borders;
          console.log(this.borders);
          const borderCheck = () => {
            this.borderingCountries = [];
            if (this.borders.length <= 0) {
              return;
            } else {

            }

            this.borders.forEach(border => {

              const apiEndpoint = `https://restcountries.eu/rest/v2/alpha/${border}`;

              fetch(apiEndpoint)
                .then(response => response.json())
                .then(data => {

                  this.borderingCountries.push(data.name);
                }).catch(error => console.log(error))

            })
          }
          borderCheck();
          // ###################################### //
        }).catch(error => console.log(error))
    }

    fetchCountry();



  }

  //End of country btn logic

  
}

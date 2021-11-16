import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/shared/models/country.model';
import { PaisService } from 'src/app/shared/services/pais.service';

@Component({
  selector: 'app-pais',
  templateUrl: './pais.component.html',
  styleUrls: ['./pais.component.css']
})
export class PaisComponent implements OnInit {

  valueToFind: string = '';
  isErrorHttp: boolean = false;
  countries: Country[] = [];

  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
  }

  findCountry() {
    console.log(this.valueToFind)
    this.isErrorHttp = false;
    this.paisService.findCountries(this.valueToFind).subscribe((data: Country[]) => {
      console.log(data)
      this.countries = data;
    }, error => {
      this.isErrorHttp = true;
      console.log('error: ', error);
    });
  }

}

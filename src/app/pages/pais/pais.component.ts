import { Component, OnInit } from '@angular/core';
import { PaisService } from 'src/app/shared/services/pais.service';

@Component({
  selector: 'app-pais',
  templateUrl: './pais.component.html',
  styleUrls: ['./pais.component.css']
})
export class PaisComponent implements OnInit {

  valueToFind: string = ''
  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
  }

  findCountry() {
    console.log(this.valueToFind)
    this.paisService.findCountries(this.valueToFind).subscribe(data => {
      console.log(data);
    });
  }

}

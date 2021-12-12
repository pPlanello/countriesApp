import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';

import { Country } from 'src/app/shared/models/country.model';
import { PaisService } from 'src/app/shared/services/pais.service';

@Component({
  selector: 'app-pais-modal',
  templateUrl: './pais-modal.component.html',
  styleUrls: ['./pais-modal.component.css']
})
export class PaisModalComponent implements OnInit {

  country!: Country;
  translations: string[] = [];

  constructor(private activatedRoute: ActivatedRoute, private paisService: PaisService) { }

  ngOnInit(): void {
    // this.activatedRoute.params.subscribe(({id}) => { // Es lo mismo que decir el tipado que te llega del valor
    //   this.paisService.getPaisById(id).subscribe((element: Country[]) => {
    //     this.country = element[0];
    //     console.log(this.country);
    //   });
    // });

    this.translations = [];
    this.activatedRoute.params.pipe(
        switchMap((params) => this.paisService.getPaisById(params.id)),
        tap(console.log)
      ).subscribe((resp: Country[]) => {
        this.country = resp[0];
        let obj = this.country.translations;
        Object.keys(this.country.translations).forEach(key => this.translations.push(obj[key].official));
      });
  }

}

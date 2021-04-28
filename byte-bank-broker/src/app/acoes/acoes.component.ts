import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { AcoesService } from './acoes.service'
import { merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';

const ESPERA_DIGITACAO = 900

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent {

  acoesInput = new FormControl();

  todasAcoes$ = this.acoesService.getAcoes()
    .pipe(
      tap(() => console.log('Fluxo inicial'))
    )

  filtroInput$ = this.acoesInput.valueChanges
    .pipe(
      tap(() => console.log('Fluxo do filtro')),
      tap(console.log),
      filter((valorDigitado) => valorDigitado.length >= 3 || !valorDigitado.length),
      debounceTime(ESPERA_DIGITACAO),
      distinctUntilChanged(),
      switchMap((valorDigitado) => this.acoesService.getAcoes(valorDigitado))
    )

  acoes$ = merge(this.todasAcoes$, this.filtroInput$)

  constructor(private acoesService: AcoesService) { }

}

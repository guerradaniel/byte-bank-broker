import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Acao, AcoesAPI } from './modelo/acoes';
import { map, pluck, tap } from 'rxjs/operators'

const API_URL = 'http://localhost:3000'

@Injectable({
  providedIn: 'root'
})
export class AcoesService {

  constructor(
    private http: HttpClient) { }

  getAcoes() {
    return this.http.get<AcoesAPI>(`${API_URL}/acoes`)
      .pipe(
        tap((valor) => console.log(valor)),
        pluck('payload'),
        map((acoes) =>
          acoes.sort((acaoA, acaoB) => this.ordenaPorCodigo(acaoA, acaoB))
        )
      )
  }

  private ordenaPorCodigo(acaoA: Acao, acaoB: Acao) {
    if (acaoA.codigo > acaoB.codigo) {
      return 1
    } if (acaoA.codigo < acaoB.codigo) {
      return -1
    }
    return 0
  }


}

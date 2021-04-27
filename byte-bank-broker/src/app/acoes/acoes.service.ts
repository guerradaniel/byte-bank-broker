import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AcoesAPI } from './modelo/acoes';


const API_URL = 'http://localhost:3000'

@Injectable({
  providedIn: 'root'
})
export class AcoesService {

  constructor(
    private http: HttpClient) { }

  getAcoes() {
    return this.http.get<AcoesAPI>(`${API_URL}/acoes`)
  }

}

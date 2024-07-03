import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment';
import { ResultadoConsultaProcessual } from '../interfaces/resultado-consulta-processual';

@Injectable({
  providedIn: 'root'
})
export class ProcessoService {
  private baseUrl: string = environment.apiUrl;
  private token: string = environment.token;

  constructor(private http: HttpClient) { }

  getProcessos(
    orgao: string,
    sistemaProcessual: string,
    nomeParte?: string,
    numero?: string,
    numeroDocumento?: string
  ): Observable<ResultadoConsultaProcessual[]> {
    const baseParams = new HttpParams()
      .set('orgao', orgao)
      .set('sistemaProcessual', sistemaProcessual)
      .set('start', '0')
      .set('length', '500')
      .set('buscaNomeExato', 'true');

    const optionalParams = [
      { key: 'numero', value: numero },
      { key: 'numeroDocumento', value: numeroDocumento },
      { key: 'nomeParte', value: nomeParte }
    ];

    const params = optionalParams.reduce(
      (acc, param) => param.value !== undefined ? acc.set(param.key, param.value) : acc, baseParams
    );

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.get<ResultadoConsultaProcessual[]>(`${this.baseUrl}/processos`, { headers, params });
  }
}

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment';
import { ResultadoConsultaProcessual } from '../interfaces/resultado-consulta-processual';

@Injectable({
  providedIn: 'root'
})

export class ProcessoService {
  private baseUrl = '/api/cp/api/v1';
  private token: string = environment.token;

  constructor(private http: HttpClient) { }

  getProcessos(    
    sistemaProcessual: string,
    searchTerm: string,
    searchParam: string
  ): Observable<ResultadoConsultaProcessual[]> {
    const baseParams = new HttpParams()
      .set('sistemaProcessual', sistemaProcessual)
      .set('start', '0')
      .set('length', '500')
      .set(searchParam, searchTerm)
      .set('buscaNomeExato', 'true');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
    });

    return this.http.get<ResultadoConsultaProcessual[]>(`${this.baseUrl}/processos`, { headers, params:baseParams });
  }

  getProcessosAdvanced(
    origem?: string,
    sistemaProcessual?: string,
    nomeParte?: string,
    numero?: string,
    numeroDocumento?: string,
    numeroOab?: string,
    classeJudicial?: string
  ): Observable<ResultadoConsultaProcessual[]>{
    const baseParams = new HttpParams()
      .set('orgao', origem ?? "")
      .set('sistemaProcessual', sistemaProcessual ?? "PJE")
      .set('numero', numero ?? "")
      .set('numeroDocumento', numeroDocumento ?? "")
      .set('nomeParte', nomeParte ?? "")
      .set('numeroOab',numeroOab ?? "")
      .set('classeJudicial',classeJudicial ?? "")
      .set('start', '0')
      .set('length', '100')
      .set('buscaNomeExato', 'true');
      
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
    });
    console.log(`${this.baseUrl}/processos${baseParams}`);
    return this.http.get<ResultadoConsultaProcessual[]>(`${this.baseUrl}/processos`, { headers, params: baseParams });
  }
}

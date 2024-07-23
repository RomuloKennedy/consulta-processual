import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProcessoService } from '../services/processo.service';
import { Subscription } from 'rxjs';

import { ResultadoConsultaProcessual } from '../interfaces/resultado-consulta-processual';
import { Processo } from '../interfaces/processo';
import { Parte } from '../interfaces/parte';
import { Router } from '@angular/router';
import { DateFormatPipe } from '../date-format.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule, 
    CommonModule, 
    RouterModule,
    MatAutocompleteModule, 
    MatInputModule, 
    MatFormFieldModule, 
    MatIconModule, 
    MatCardModule, 
    MatTooltipModule,
    DateFormatPipe
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private response: ResultadoConsultaProcessual[] = [];

  processos: Processo[] = [];

  partesOrdenada: Parte[] = [];

  private subscription: Subscription | null = null;

  headerTitle1 = 'Busca processual Unificada';
  headerTitle2 = 'Tribunal Regional Federal da 5ª região';
  title = 'Busque por nome, número do processo, CPF ou CNPJ';
  searchPlaceholder = 'Digite um nome, cpf, cnpj ou número do processo';
  tooltipMessage = `
    Digite o Número do Processo, CNPJ ou CPF com ou sem os caracteres especiais ( ., -).
    Para pesquisar por nome, utilize o nome completo.
    Exemplos:
      - Número do Processo: 1234567-89.2023.8.26.0000 ou 12345678920238260000
      - CPF: 123.456.789-00 ou 12345678900
      - Nome: João Maria da Silva\n
  `;
  searchValue = '';
  filteredOptions: string[] = [];
  MAX_HISTORY_SIZE = 5; // Defina o tamanho máximo do histórico

  constructor(private processoService: ProcessoService, private router: Router) { }

  normalizeString(str: string): string {
    return str.replace(/[.-]/g, '');
  }

  updateSuggestion(){
    this.updateSearchHistory(this.searchValue);
  }

  private updateSearchHistory(searchTerm: string) {
    if(searchTerm != '' && !(this.filteredOptions.includes(searchTerm)) ){
      this.filteredOptions = [searchTerm, ...this.filteredOptions];
    }

    // Limitar o tamanho do histórico
    if (this.filteredOptions.length > this.MAX_HISTORY_SIZE) {
      this.filteredOptions.pop();
    }

    localStorage.setItem('searchHistory', JSON.stringify(this.filteredOptions));
  }

  getProcessos(orgao: string, sistemaProcessual: string, nomeParte: string): void {
    this.subscription = this.processoService.getProcessos(orgao, sistemaProcessual, nomeParte)
      .subscribe({
        next: (data: ResultadoConsultaProcessual[]) => {
          this.response = data;
          this.processos = this.response[0].processos.map(processo => {
            const partesOrdenadas = this.sortPartes(processo.partes);
            return {
              ...processo,
              partes: partesOrdenadas,
              primeiraParteAtiva: partesOrdenadas.find(parte => parte.tipoPolo === 'A'),
              primeiraPartePassiva: partesOrdenadas.find(parte => parte.tipoPolo === 'P')
            };
          });
          console.log(this.processos);
        },
        error: (error) => {
          console.error('Erro ao buscar processos:', error);
        },
        complete: () => {
          console.log('Requisição completa');
        }
      });
  }

  ngOnInit(): void {
    // Chame getProcessos no ngOnInit se quiser buscar processos ao carregar o componente
    // this.getProcessos('orgaoExemplo', 'sistemaExemplo', 'nomeParteExemplo');
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSearch(): void {
    const searchTerm = this.searchValue.trim();
    if (searchTerm) {
      // Suponha que você está buscando por nomeParte com o termo de busca
      this.getProcessos('TRF5', 'PJE', searchTerm);
    }
  }

  sortPartes(partes: Parte[]): Parte[] {
    const poloA = partes.filter(parte => parte.tipoPolo === 'A').sort((a, b) => a.nome.localeCompare(b.nome));
    const poloP = partes.filter(parte => parte.tipoPolo === 'P').sort((a, b) => a.nome.localeCompare(b.nome));
    return [...poloA, ...poloP];
  }

  navigateToDetalhes(processo: any) {
    this.router.navigate(['/mais-detalhes'], { state: { processo } });
  }

}

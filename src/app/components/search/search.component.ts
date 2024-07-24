import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DateFormatPipe } from '../../date-format.pipe';
import { ResultadoConsultaProcessual } from '../../interfaces/resultado-consulta-processual';
import { Processo } from '../../interfaces/processo';
import { Parte } from '../../interfaces/parte';
import { Subscription } from 'rxjs';
import { ProcessoService } from '../../services/processo.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search',
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
    DateFormatPipe,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit, OnDestroy{


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
  private response: ResultadoConsultaProcessual[] = [];
  MAX_HISTORY_SIZE = 5; // Defina o tamanho máximo do histórico
  processos: Processo[] = [];

  partesOrdenada: Parte[] = [];

  private subscription: Subscription | null = null;
  constructor(private processoService: ProcessoService, private router: Router) { }

  onSearch(): void {
    const searchTerm = this.searchValue.trim();
    if (searchTerm) {
      // Suponha que você está buscando por nomeParte com o termo de busca
      this.getProcessos('TRF5', 'PJE', searchTerm);
    }
  }
  ngOnInit(): void {
    this.loadSearchHistory();

  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  updateSuggestion() {
    this.updateSearchHistory(this.searchValue);
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
  

  sortPartes(partes: Parte[]): Parte[] {
    const poloA = partes.filter(parte => parte.tipoPolo === 'A').sort((a, b) => a.nome.localeCompare(b.nome));
    const poloP = partes.filter(parte => parte.tipoPolo === 'P').sort((a, b) => a.nome.localeCompare(b.nome));
    return [...poloA, ...poloP];
  }
  
  navigateToDetalhes(processo: any) {
    this.router.navigate(['/mais-detalhes'], { state: { processo } });
  }
  private updateSearchHistory(searchTerm: string) {
    if (searchTerm != '' && !(this.filteredOptions.includes(searchTerm))) {
      this.filteredOptions = [searchTerm, ...this.filteredOptions];
    }

    // Limitar o tamanho do histórico
    if (this.filteredOptions.length > this.MAX_HISTORY_SIZE) {
      this.filteredOptions.pop();
    }

    localStorage.setItem('searchHistory', JSON.stringify(this.filteredOptions));
  }

  private loadSearchHistory(): void {
    const history = localStorage.getItem('searchHistory');
    if (history) {
      this.filteredOptions = JSON.parse(history);
    }
  }

  transformToArray(data: any): number[] {
    if (Array.isArray(data)) {
      return data;
    }
    if (typeof data === 'string') {
      try {
        return JSON.parse(data);
      } catch (e) {
        console.error('Data format is invalid', data);
      }
    }
    return [];
  }


}

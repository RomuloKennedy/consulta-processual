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
import { MatProgressBarModule } from '@angular/material/progress-bar';
import IMask from 'imask';

import { interval } from 'rxjs';
import { takeWhile, tap } from 'rxjs/operators';

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
    MatProgressBarModule,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
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


  progress = 0;
  showProgress = false;

  nenhumProcessoEncontrado = false;


  constructor(private processoService: ProcessoService, private router: Router) { }

  onSearch(): void {
    const searchTerm = this.searchValue.trim();
    this.showProgress = true;
    this.progress = 0;
    this.processos = []; // caso eu pesquise, e a lista de processos possuir valor

    // simular progresso, pois a demora é a resposta a requisição da API
    const interval = setInterval(() => {
      if (this.progress < 70) {
        this.progress += 10;
      } else {
        clearInterval(interval);
      }
    }, 1000);


    if (searchTerm) {
      // Suponha que você está buscando por nomeParte com o termo de busca
      this.getProcessos('PJE', searchTerm);
    }
  }
  onChange(event: any) {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    // Remove todos os caracteres não numéricos
    const numericValue = value.replace(/\D/g, '');

    if (/^[0-9]/.test(value)) {
      switch (true) {
        case (numericValue.length <= 11):
          value = this.applyMask(numericValue, '000.000.000-00');
          break;
        case (numericValue.length <= 14):
          value = this.applyMask(numericValue, '00.000.000/0000-00');
          break;
        default:
          value = this.applyMask(numericValue, '0000000-00.0000.0.00.0000');
      }
    }

    input.value = value;
    this.searchValue = value;
  }

  applyMask(value: string, mask: string): string {
    let maskedValue = '';
    let valueIndex = 0;

    for (const maskChar of mask) {
      if (maskChar === '0') {
        if (value[valueIndex]) {
          maskedValue += value[valueIndex];
          valueIndex++;
        } else {
          break;
        }
      } else {
        if (valueIndex < value.length) {
          maskedValue += maskChar;
        }
      }
    }

    return maskedValue;
  }

  clearSearch(): void{
    this.searchValue = '';
    this.processos = [];
    this.showProgress = false;
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
  getProcessos(sistemaProcessual: string, nomeParte: string): void {
    this.subscription = this.processoService.getProcessos(sistemaProcessual, nomeParte)
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
          this.router.navigate(['/pagina-error']);
        },
        complete: () => {
          console.log('Requisição completa');
          this.progress = 100;

          if(this.processos.length == 0){
            this.showProgress = false;
            this.nenhumProcessoEncontrado = true;
          }

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

  fecharDiv(div: HTMLElement): void {
    div.style.display = 'none';
  }

}

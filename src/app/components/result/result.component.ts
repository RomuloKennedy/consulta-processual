import { Component } from '@angular/core';
import { ResultValuesService } from '../../services/result-values.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { DateFormatPipe } from '../../date-format.pipe';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    DateFormatPipe,
  ],
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent {

  constructor(private router: Router, public resultValues: ResultValuesService){}

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

  navigateToDetalhes(processo: any) {
    this.router.navigate(['/mais-detalhes'], { state: { processo } });
  }

  carregarMaisProcessos(): void {
    const inicio = this.resultValues.visibleProcessos.length;
    const fim = inicio + this.resultValues.processosPorPagina;
    this.resultValues.visibleProcessos = [...this.resultValues.visibleProcessos, ...this.resultValues.processos.slice(inicio, fim)];
    this.resultValues.paginaAtual++;
  }
}
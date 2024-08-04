import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { DateFormatPipe } from '../../date-format.pipe';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ResultAdvancedValuesService } from '../../services/result-advanced-values.service';

@Component({
  selector: 'app-result-advanced',
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
    RouterModule,
    DateFormatPipe,
  ],
  templateUrl: './result-advanced.component.html',
  styleUrl: './result-advanced.component.css'
})
export class ResultAdvancedComponent {
  constructor(private router: Router, public resultValues: ResultAdvancedValuesService){}

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

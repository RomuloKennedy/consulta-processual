import { Component } from '@angular/core';
import { AdvancedInputComponent } from '../advanced-input/advanced-input.component';
import { MatSelectModule } from '@angular/material/select';
import { HeaderComponent } from "../header/header.component";
import { AdvancedInputSelectComponent } from "../advanced-input-select/advanced-input-select.component";
import { ProcessoService } from '../../services/processo.service';
import { Router } from '@angular/router';
import { SearchAdvancedParamsService } from '../../services/search-advanced-params.service';

@Component({
  selector: 'app-advanced-search',
  standalone: true,
  imports: [
    AdvancedInputComponent,
    MatSelectModule,
    HeaderComponent,
    AdvancedInputSelectComponent
],
  templateUrl: './advanced-search.component.html',
  styleUrl: './advanced-search.component.css'
})
export class AdvancedSearchComponent {  

  constructor(private processoService: ProcessoService, private router: Router, private params: SearchAdvancedParamsService) { }

  optionsUf = [
    { value: 'UF', display: 'UF' },
    { value: 'AC', display: 'Acre' },
    { value: 'AL', display: 'Alagoas' },
    { value: 'AP', display: 'Amapá' },
    { value: 'AM', display: 'Amazonas' },
    { value: 'BA', display: 'Bahia' },
    { value: 'CE', display: 'Ceará' },
    { value: 'DF', display: 'Distrito Federal' },
    { value: 'ES', display: 'Espírito Santo' },
    { value: 'GO', display: 'Goiás' },
    { value: 'MA', display: 'Maranhão' },
    { value: 'MT', display: 'Mato Grosso' },
    { value: 'MS', display: 'Mato Grosso do Sul' },
    { value: 'MG', display: 'Minas Gerais' },
    { value: 'PA', display: 'Pará' },
    { value: 'PB', display: 'Paraíba' },
    { value: 'PR', display: 'Paraná' },
    { value: 'PE', display: 'Pernambuco' },
    { value: 'PI', display: 'Piauí' },
    { value: 'RJ', display: 'Rio de Janeiro' },
    { value: 'RN', display: 'Rio Grande do Norte' },
    { value: 'RS', display: 'Rio Grande do Sul' },
    { value: 'RO', display: 'Rondônia' },
    { value: 'RR', display: 'Roraima' },
    { value: 'SC', display: 'Santa Catarina' },
    { value: 'SP', display: 'São Paulo' },
    { value: 'SE', display: 'Sergipe' },
    { value: 'TO', display: 'Tocantins' }
];

  optionsOrigem = [
    { value: 'TRF5', display: 'TRF5' },
    { value: 'JFRN', display: 'JFRN' },
    { value: 'JFPB', display: 'JFPB' },
    { value: 'JFCE', display: 'JFCE' },
    { value: 'JFSE', display: 'JFSE' },
    { value: 'JFAL', display: 'JFAL' },
    { value: 'JFPE', display: 'JFPE' }
];

  clearForm(): void {
  // Emitir o evento de limpeza
  const event = new CustomEvent('clearForm');
  window.dispatchEvent(event);
}
  searchAdvanced(): void{
    const numerOab = (this.params.numeroOabUF + this.params.numeroOabNumber + this.params.numeroOabWord);
    this.processoService.getProcessosAdvanced(this.params.origem,this.params.sistemaProcessual,this.params.nomeParte,this.params.numero,this.params.numeroDocumento,numerOab, this.params.classeJudicial);
  }
}

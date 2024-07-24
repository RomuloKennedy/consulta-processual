import { Component } from '@angular/core';
import { AdvancedInputComponent } from '../advanced-input/advanced-input.component';
import { MatSelectModule } from '@angular/material/select';
import { HeaderComponent } from "../header/header.component";
import { AdvancedInputSelectComponent } from "../advanced-input-select/advanced-input-select.component";

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
  
  optionsUf = [
    { value: 'uf', display: 'UF' },
    { value: 'ac', display: 'Acre' },
    { value: 'al', display: 'Alagoas' },
    { value: 'ap', display: 'Amapá' },
    { value: 'am', display: 'Amazonas' },
    { value: 'ba', display: 'Bahia' },
    { value: 'ce', display: 'Ceará' },
    { value: 'df', display: 'Distrito Federal' },
    { value: 'es', display: 'Espírito Santo' },
    { value: 'go', display: 'Goiás' },
    { value: 'ma', display: 'Maranhão' },
    { value: 'mt', display: 'Mato Grosso' },
    { value: 'ms', display: 'Mato Grosso do Sul' },
    { value: 'mg', display: 'Minas Gerais' },
    { value: 'pa', display: 'Pará' },
    { value: 'pb', display: 'Paraíba' },
    { value: 'pr', display: 'Paraná' },
    { value: 'pe', display: 'Pernambuco' },
    { value: 'pi', display: 'Piauí' },
    { value: 'rj', display: 'Rio de Janeiro' },
    { value: 'rn', display: 'Rio Grande do Norte' },
    { value: 'rs', display: 'Rio Grande do Sul' },
    { value: 'ro', display: 'Rondônia' },
    { value: 'rr', display: 'Roraima' },
    { value: 'sc', display: 'Santa Catarina' },
    { value: 'sp', display: 'São Paulo' },
    { value: 'se', display: 'Sergipe' },
    { value: 'to', display: 'Tocantins' }
  ];

  optionsOrigem = [
    { value: 'trf1', display: 'TRF 1° região' },
    { value: 'trf2', display: 'TRF 2° região' },
    { value: 'trf3', display: 'TRF 3° região' },
    { value: 'trf4', display: 'TRF 4° região' },
    { value: 'trf5', display: 'TRF 5° região' }
];

  clearForm(): void {
  // Emitir o evento de limpeza
  const event = new CustomEvent('clearForm');
  window.dispatchEvent(event);
}
}

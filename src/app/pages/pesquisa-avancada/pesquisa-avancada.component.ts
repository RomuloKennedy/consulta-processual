import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { AdvancedSearchComponent } from "../../components/advanced-search/advanced-search.component";
import { ResultComponent } from "../../components/result/result.component";
import { ResultAdvancedValuesService } from '../../services/result-advanced-values.service';
import { ResultAdvancedComponent } from "../../components/result-advanced/result-advanced.component";

@Component({
  selector: 'app-pesquisa-avancada',
  standalone: true,
  imports: [HeaderComponent, AdvancedSearchComponent, ResultComponent, ResultAdvancedComponent],
  providers: [
    { provide: 'ResultValueService', useClass: ResultAdvancedValuesService }
  ],
  templateUrl: './pesquisa-avancada.component.html',
  styleUrl: './pesquisa-avancada.component.css'
})
export class PesquisaAvancadaComponent {

}

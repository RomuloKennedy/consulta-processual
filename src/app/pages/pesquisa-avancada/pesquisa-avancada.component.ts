import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { AdvancedSearchComponent } from "../../components/advanced-search/advanced-search.component";

@Component({
  selector: 'app-pesquisa-avancada',
  standalone: true,
  imports: [HeaderComponent, AdvancedSearchComponent],
  templateUrl: './pesquisa-avancada.component.html',
  styleUrl: './pesquisa-avancada.component.css'
})
export class PesquisaAvancadaComponent {

}

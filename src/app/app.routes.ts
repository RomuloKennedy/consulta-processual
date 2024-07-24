import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetalhesDoProcessoComponent } from './pages/detalhes-do-processo/detalhes-do-processo.component';
import { AdvancedSearchComponent } from './components/advanced-search/advanced-search.component';
import { PesquisaAvancadaComponent } from './pages/pesquisa-avancada/pesquisa-avancada.component';

export const routes: Routes = [

    {
        path: '',
        component: HomeComponent
    },

    {
        path: 'mais-detalhes',
        component: DetalhesDoProcessoComponent
    },
    {
        path: 'pesquisa-avancada',
        component: PesquisaAvancadaComponent
    }
];

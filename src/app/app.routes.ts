import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MaisDetalhesComponent } from './mais-detalhes/mais-detalhes.component';
import { AdvancedSearchComponent } from './advanced-search/advanced-search.component';

export const routes: Routes = [

    {
        path: '',
        component: HomeComponent
    },

    {
        path:'mais-detalhes',
        component: MaisDetalhesComponent
    },
    {
        path:'pesquisa-avancada',
        component: AdvancedSearchComponent
    }
    

];

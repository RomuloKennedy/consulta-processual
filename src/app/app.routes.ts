import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetalhesDoProcessoComponent } from './pages/detalhes-do-processo/detalhes-do-processo.component';

export const routes: Routes = [

    {
        path: '',
        component: HomeComponent
    },

    {
        path: 'mais-detalhes',
        component: DetalhesDoProcessoComponent
    }


];

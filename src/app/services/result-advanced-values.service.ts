import { Injectable } from '@angular/core';
import { Processo } from '../interfaces/processo';

@Injectable({
    providedIn: 'root'
})

export class ResultAdvancedValuesService {
    processos: Processo[] = [];
    visibleProcessos: Processo[] = [];
    processosPorPagina = 5;
    paginaAtual = 1;
}
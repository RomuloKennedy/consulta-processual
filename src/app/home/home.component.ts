import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';




interface Processo {
  numeroDoProcesso: string;
  nome: string;
  cpf: string;
  classeJudicial: string;
  secao: string;
  grau: string;
  instancia: string;
  ultimaMovimentacao: string;
}


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, 
    MatAutocompleteModule, MatInputModule, MatFormFieldModule, MatIconModule, MatCardModule, MatTooltipModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  headerTitle1 = 'Busca processual Unificada'
  headerTitle2 = 'Tribunal regional federal da quinta região'

  title = 'Busque por nome, número do processo, CPF ou CNPJ';

  searchPlaceholder = 'Digite um nome, cpf, cnpj ou número do processo';

  tooltipMessage = `
  Digite o Número do Processo, CNPJ ou CPF com ou sem os caracteres especiais ( ., -).
  Para pesquisar por nome, utilize o nome completo.

  Exemplos:
      - Número do Processo: 1234567-89.2023.8.26.0000 ou 12345678920238260000
  
      - CPF: 123.456.789-00 ou 12345678900
  
      - Nome: João Maria da Silva\n

`;


  searchValue = '';
  filteredOptions: string[] = [];


  MAX_HISTORY_SIZE = 5; // Defina o tamanho máximo do histórico


  constructor() {
    // Carregar histórico do localStorage ao iniciar
    // const storedHistory = localStorage.getItem('searchHistory');
    // if (storedHistory) {
    //   this.filteredOptions = JSON.parse(storedHistory);
    // }
  }


  // Lista original de processos
  processosOriginais: Processo[] = [
    {
      numeroDoProcesso: '0734821-85.2019.8.13.0123',
      nome: 'Maria Cabral da Silva', 
      cpf: '123.456.789-10', 
      classeJudicial: 'PROCEDIMENTO DO JUIZADO ESPECIAL CÍVEL',
      secao:'RN',
      grau: '1° grau',
      instancia:'JEF',
      ultimaMovimentacao: '16/04/2024 (15:42)'   
    },
    {
      numeroDoProcesso: "0028936-17.2023.4.01.5432",
      nome: "João da Silva",
      cpf: "987.654.321-98",
      classeJudicial: "AÇÃO PENAL",
      secao: "PB",
      grau: "2° grau",
      instancia: "TRF",
      ultimaMovimentacao: "17/05/2024 (09:30)"
    },
    {
      numeroDoProcesso: "0391645-49.2021.9.24.8765",
      nome: "Ana Oliveira",
      cpf: "456.789.123-45",
      classeJudicial: "MANDADO DE SEGURANÇA",
      secao: "CE",
      grau: "1° grau",
      instancia: "JEF",
      ultimaMovimentacao: "17/05/2024 (10:15)"
    },
    {
      numeroDoProcesso: "0186290-32.2018.3.18.1928",
      nome: "Carlos Santos",
      cpf: "111.222.333-44",
      classeJudicial: "EXECUÇÃO FISCAL",
      secao: "PE",
      grau: "1° grau",
      instancia: "JEF",
      ultimaMovimentacao: "17/05/2024 (11:00)"
    },
    {
      numeroDoProcesso: "0549103-66.2022.5.05.3746",
      nome: "Fernanda Souza",
      cpf: "222.333.444-55",
      classeJudicial: "PROCEDIMENTO COMUM",
      secao: "RJ",
      grau: "1° grau",
      instancia: "JEF",
      ultimaMovimentacao: "17/05/2024 (11:45)"
    },
    {
      numeroDoProcesso: "0823915-71.2020.7.19.5678",
      nome: "Pedro Rocha",
      cpf: "555.666.777-88",
      classeJudicial: "AÇÃO DE INDENIZAÇÃO",
      secao: "SP",
      grau: "2° grau",
      instancia: "TRF",
      ultimaMovimentacao: "17/05/2024 (12:30)"
    }
  ];


  // ele cria um array que contem todos elementos do array original
  listaDeProcessos: Processo[] = [];

  normalizeString(str: string): string {
    return str.replace(/[.-]/g, '');
  }
  
  onSearch() {
    const searchTerm = this.normalizeString(this.searchValue.toLowerCase().trim());


    if (!searchTerm) {
      this.listaDeProcessos = [];
      return;
    }

    // Filtrar a lista de processos com base no termo de pesquisa
    this.listaDeProcessos = this.processosOriginais.filter(processo => {
      return (
        processo.nome.toLowerCase().includes(searchTerm) ||
        processo.cpf.replaceAll('.', '').replaceAll('-', '').includes(searchTerm) ||
        processo.numeroDoProcesso.replaceAll('.', '').replaceAll('-', '').includes(searchTerm)
        // Adicione mais campos se desejar, como CNPJ, por exemplo
      );
    });

  }

  updateSuggestion(){
    this.updateSearchHistory(this.searchValue);
  }


  private updateSearchHistory(searchTerm: string) {

    if(searchTerm != '' && !(this.filteredOptions.includes(searchTerm)) ){
      this.filteredOptions = [searchTerm, ...this.filteredOptions];
    }

    // Limitar o tamanho do histórico
    if (this.filteredOptions.length > this.MAX_HISTORY_SIZE) {
      this.filteredOptions.pop();
    }

    localStorage.setItem('searchHistory', JSON.stringify(this.filteredOptions));
  }

  onSearchApi(){
    const searchTerm = this.normalizeString(this.searchValue.toLowerCase().trim());
    
    if (!searchTerm) {
      this.listaDeProcessos = [];
      return;
    }

    // verificar se a string possui numeros
    if(/\d/.test(searchTerm)){

      if(searchTerm.length <= 11){
        this.listaDeProcessos = this.processosOriginais.filter(processo =>{
          return(
            processo.cpf.replaceAll('.', '').replaceAll('-', '').includes(searchTerm)
          );
        });
      }

      // else if( searchTerm.length == 14){}

      else if(searchTerm.length > 11 && searchTerm.length <= 20){
        this.listaDeProcessos = this.processosOriginais.filter(processo =>{
          return(
            processo.numeroDoProcesso.replaceAll('.', '').replaceAll('-', '').includes(searchTerm)
          );
        });
      }
    }
    else{
      this.listaDeProcessos = this.processosOriginais.filter(processo =>{
        return(
          processo.nome.toLowerCase().includes(searchTerm)
        );
      });
    }
  }



}

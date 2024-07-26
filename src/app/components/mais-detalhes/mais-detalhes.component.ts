import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DateFormatPipe } from '../../date-format.pipe';
import { HeaderComponent } from '../header/header.component';
import { Parte } from '../../interfaces/parte';

@Component({
  selector: 'app-mais-detalhes',
  standalone: true,
  imports: [CommonModule, DateFormatPipe, HeaderComponent],
  templateUrl: './mais-detalhes.component.html',
  styleUrl: './mais-detalhes.component.css'
})
export class MaisDetalhesComponent implements OnInit {
  processo: any;
  groupedPartes: { [key: string]: Parte[] } = {};
  visibleGroups: { [key: string]: boolean } = {};
 
  headerTitle2 = 'Tribunal regional federal da quinta região';

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.processo = navigation.extras.state['processo'];
    }
  }

  ngOnInit(): void {
    console.log(this.processo);
    this.groupPartes();
  }

  groupPartes(): void {
    this.processo.partes.forEach((parte: Parte) => {
      if (!this.groupedPartes[parte.nome]) {
        this.groupedPartes[parte.nome] = [];
      }
      this.groupedPartes[parte.nome].push(parte);
    });
  
    console.log(this.groupedPartes);
  }

  toggleGroup(nome: string): void {
    this.visibleGroups[nome] = !this.visibleGroups[nome];
  }

  isGroupVisible(nome: string): boolean {
    return !!this.visibleGroups[nome];
  }

  getGroupedPartesKeys(): string[] {
    return Object.keys(this.groupedPartes);
  }


}

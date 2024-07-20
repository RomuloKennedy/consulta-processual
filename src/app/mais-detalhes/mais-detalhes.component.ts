import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mais-detalhes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mais-detalhes.component.html',
  styleUrl: './mais-detalhes.component.css'
})


export class MaisDetalhesComponent implements OnInit {
  processo: any;
  headerTitle2 = 'Tribunal regional federal da quinta região';

  

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.processo = navigation.extras.state['processo'];
    }
  }

  ngOnInit(): void {
    console.log(this.processo);
  }

}

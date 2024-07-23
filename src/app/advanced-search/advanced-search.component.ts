import { Component } from '@angular/core';
import { AdvancedInputComponent } from './advanced-input/advanced-input.component';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-advanced-search',
  standalone: true,
  imports: [
    AdvancedInputComponent,
    MatSelectModule
  ],
  templateUrl: './advanced-search.component.html',
  styleUrl: './advanced-search.component.css'
})
export class AdvancedSearchComponent {
  headerTitle2 = 'Tribunal regional federal da quinta região';

  selectedOption = "";
  options = [
    { value: 'option1', viewValue: 'Opção 1' },
    { value: 'option2', viewValue: 'Opção 2' },
    { value: 'option3', viewValue: 'Opção 3' }
  ];
}

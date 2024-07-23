import { Component, Input } from '@angular/core';

type inputTypes = "text" | "cpf"

@Component({
  selector: 'app-advanced-input',
  standalone: true,
  imports: [],
  templateUrl: './advanced-input.component.html',
  styleUrl: './advanced-input.component.css'
})
export class AdvancedInputComponent {
  @Input() type: inputTypes = "text";    
  @Input() value = "";
  @Input() label = "";
  @Input() inputName = "";

  onInput(event: Event){
    const value = (event.target as HTMLInputElement).value;
    this.onChange(value);
  }
  onChange(value:string){
    this.value = value;
    console.log(value);
  }
}

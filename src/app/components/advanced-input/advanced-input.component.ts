import { AfterViewInit, Component, Input, OnDestroy} from '@angular/core';

type inputTypes = "text" | "cpf"

@Component({
  selector: 'app-advanced-input',
  standalone: true,
  imports: [],
  templateUrl: './advanced-input.component.html',
  styleUrl: './advanced-input.component.css'
})
export class AdvancedInputComponent implements OnDestroy, AfterViewInit {
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
    console.log(this.inputName);
  }


  ngAfterViewInit(): void {
    // Definir o ouvinte para o evento de limpeza após a visualização ser inicializada
    if (typeof window !== 'undefined') {
      this.clearValue = this.clearValue.bind(this)
      window.addEventListener('clearForm', this.clearValue);
    }
  }
  ngOnDestroy(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('clearForm', this.clearValue);
    }
  }

  clearValue(): void {
    this.value = "";
  }

}

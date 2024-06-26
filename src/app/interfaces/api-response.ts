import { Processo } from "./processo";
import { SistemaProcessual } from "./sistema-processual";

export interface ApiResponse {
  orgao: string;
  sistemaProcessual: SistemaProcessual;
  resultado: Resultado;
  processos: Processo[];
  totalProcessos: number;
}

interface Resultado {
  codigo: number;
  mensagem: string;
}

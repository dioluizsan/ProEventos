import { Lote } from "./Lote";
import { Palestrante } from "./Palestrante";
import { RedeSociais } from "./RedeSociais";

export interface Evento {
     Id:  number;
     Local: string;   
   
     DataEvento: Date;   
     Tema: string   
     QtdPessoas: Number;  
     ImagemURL : string; 
     Telefone : string; 
     Email : string; 

     Lotes: Lote[];   
     RedeSociais : RedeSociais[]; 
     PalestranteEventos: Palestrante[]; 
}

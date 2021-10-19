import { Evento } from "./Evento";
import { Palestrante } from "./Palestrante";

export interface RedeSociais {

    Id: Number; 
    Nome: string;  
    URL: string; 
    EventoId: Number; 
    Evento: Evento;
    PalestranteId :Number; 
    Palestrante: Palestrante ;
}


import { Evento } from "./Evento";

export interface Lote {
    Id: Number;  
    Nome: string ; 
    Preco: Number;  
    DataInicio?: Date;  
    DataFim?: Date; 
    quantidade: Number;  
    EventoId: Number;  
    Evento: Evento; 
}

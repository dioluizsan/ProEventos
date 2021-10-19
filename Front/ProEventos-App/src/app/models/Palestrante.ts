import { RedeSociais } from "./RedeSociais";

export interface Palestrante {
    Id: Number;  
    Nome: string;  
    MiniCurriculo: string;  
    ImagemUrl: string;  
    Telefone: string ; 
    Email: string ; 
    RedesSociais: RedeSociais[]; 
    PalestranteEventos:Palestrante[]; 
}

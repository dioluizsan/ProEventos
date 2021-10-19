import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EventoService } from '../services/evento.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  public eventos : any =[];
  public eventosFiltrados : any =[];
  
  constructor(private eventoService:EventoService) { }

  ngOnInit(): void {

    this.geteventos();
  }

  public geteventos(): void{
    this.eventoService.getEventos().subscribe(
      response =>{
                  this.eventos = response,
                  this.eventosFiltrados = this.eventos;
    },
      error => console.log(error)
      
    );

    
  }
}

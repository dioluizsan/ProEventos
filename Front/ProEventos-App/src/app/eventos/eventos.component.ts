import { HttpClient } from '@angular/common/http';
import { Component, OnInit,TemplateRef } from '@angular/core';
import { Evento } from '../models/Evento';
import { EventoService } from '../services/evento.service';
import {BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  modalRef?: BsModalRef ;
  public eventos : any =[];
  public eventosFiltrados : any =[];
  larguraImg: number = 120;
  margemImg: number = 2;
  mostrarImagem: boolean = true;
  private filtroListado = '';
  
  public get filtroLista():string{
      return this.filtroListado;
  }

  public set filtroLista(value: string){
    this.filtroListado  = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) :this.eventos;
  }

  public filtrarEventos(filtrarPor: string): Evento[] {
    filtrarPor  = filtrarPor .toLocaleLowerCase();
    return this.eventos.filter(
      (evento: { tema: string; local: string; }) => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
      evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

 
  
  constructor(private eventoService:EventoService,private modalService: BsModalService) { }

  ngOnInit(): void {

    this.geteventos();
  }

  alterarImagem(){
    this.mostrarImagem =!this.mostrarImagem;
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

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
 
  confirm(): void {
   
    this.modalRef?.hide();
  }
 
  decline(): void {
    
    this.modalRef?.hide();
  }
}

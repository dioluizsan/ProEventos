import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Evento } from 'src/app/models/Evento';
import { EventoService } from 'src/app/services/evento.service';


import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';






@Component({
  selector: 'app-evento-lista',
  templateUrl: './evento-lista.component.html',
  styleUrls: ['./evento-lista.component.scss']
})
export class EventoListaComponent implements OnInit {


  
  modalRef?: BsModalRef ;
  public eventos : any =[];
  public eventosFiltrados : any =[];
  larguraImg: number = 120;
  margemImg: number = 2;
  mostrarImagem: boolean = true;
  eventoId : number = 0;
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

 
  
  constructor(private eventoService:EventoService,
              private modalService: BsModalService,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService,
              private router: Router) { }

  ngOnInit(): void {
    this.spinner.show();
    this.geteventos();
  }

  alterarImagem(){
    this.mostrarImagem =!this.mostrarImagem;
  }

  public geteventos(): void{
    this.eventoService.getEventos().subscribe({
      next:( retorno: Evento[] )=>{
        this.eventos = retorno,
        this.eventosFiltrados = this.eventos;
      },
      error:(error:any )=> {
        this.spinner.hide();
        this.toastr.error('Erro no carregamento','Erro!')
      },
      complete:()=>this.spinner.hide()

    });

    
  }

  openModal(event: any , template: TemplateRef<any>, eventoId: number): void {
    event.stopPropagation();
    this.eventoId = eventoId;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
 
  confirm(): void {
   
    this.modalRef?.hide();
    this.spinner.show()

    this.eventoService.deleteEvento(this.eventoId).subscribe(
      (resultado: any) =>{
        if(resultado.message =='Deletado'){
          this.toastr.success('O Evento foi deletado!', 'Deletado');
          this.spinner.hide();
          this.geteventos();
        }
      },
      () =>{
        this.toastr.error('Erro ao tentar deletar Evento','Error!');
        this.spinner.hide();
      },
      ()=>this.spinner.hide()
    )
    this.toastr.success('Excluido com Sucesso!', 'Excluido!');
  }
 
  decline(): void {
    
    this.modalRef?.hide();
  }

 detalheEvento(id:number):void {
  this.router.navigate([`eventos/detalhe/${id}`]);
 }

}

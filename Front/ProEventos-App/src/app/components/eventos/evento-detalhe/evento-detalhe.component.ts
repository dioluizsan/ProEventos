import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Evento } from 'src/app/models/Evento';
import { EventoService } from 'src/app/services/evento.service';


@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss']
})
export class EventoDetalheComponent implements OnInit {

  eventoobj = {} as Evento;
  form!: FormGroup;
  estadoSalvar = 'post';

  get f(): any {
    return this.form.controls;
  }

  get bsconfig():any {
    return { 
            isAnimated: true , 
            adaptivePosition: true, 
            dateInputFormat: 'DD/MM/YYY hh:mm a',
            containerClass:"theme-default",
            showWeekNumber:false 
        }
  }
  
  constructor(private fb: FormBuilder,
               private localeService: BsLocaleService, 
               private router: ActivatedRoute, 
               private eventoService:EventoService,
               private spinner: NgxSpinnerService,
               private toastr: ToastrService) 
               { 
                 this.localeService.use('pt-br'); 
               }

  public carregarEvento():void {
    
    const eventoId = this.router.snapshot.paramMap.get('id');

    if(eventoId !== null){
      this.spinner.show();

      this.estadoSalvar ='put';

      this.eventoService.getEventoById(+eventoId).subscribe(
        // next: () =>{this.eventoobj = Object.assign({},evento);}
        (evento: Evento) => {
                              this.eventoobj ={...evento} ; 
                              this.form.patchValue(this.eventoobj) ;
                            }, 
        // error: () =>{}
        (error: any) => {
                          this.spinner.hide();
                          this.toastr.error('Erro no carregamento do Evento');
                          console.error(error);
                        }, 
        // complete: () =>{}
        () => this.spinner.hide(), 
      );
    }

  }


  ngOnInit(): void {
    this.carregarEvento();
    this.validation();
  }

  public validation(): void {
    this.form = this.fb.group({
      tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      local: ['', Validators.required],
      dataEvento: ['', Validators.required],
      qtdPessoas: ['', [Validators.required, Validators.max(120000)]],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      imagemURL: ['', Validators.required],
    });
  }

  public resetForm(): void {
    this.form.reset();
  }

  public cssValidacao(campoForm: FormControl):any{
    return {'is-invalid': campoForm.errors && campoForm.touched};
  }

  public salvarEvento():void {
    this.spinner.show();

    if (this.form.valid){
      

      if(this.estadoSalvar=='post'){ //post

        this.eventoobj = {...this.form.value};

        this.eventoService.postEvento(this.eventoobj).subscribe(
          () => this.toastr.success('Evento Salvo com sucesso!', 'Sucesso'),
          (error: any) => {
            console.error(error);
            this.spinner.hide();
            this.toastr.error('Erro ao tentar salvar o evento!', 'Error')
          },
          () => this.spinner.hide()
        );
      }
      else{ //put

        this.eventoobj = {id:this.eventoobj.id, ...this.form.value};

        this.eventoService.putEvento(this.eventoobj.id,this.eventoobj).subscribe(
          () => this.toastr.success('Evento Salvo com sucesso!', 'Sucesso'),
          (error: any) => {
            console.error(error);
            this.spinner.hide();
            this.toastr.error('Erro ao tentar salvar o evento!', 'Error')
          },
          () => this.spinner.hide()
        );
      }


    }
  }



}
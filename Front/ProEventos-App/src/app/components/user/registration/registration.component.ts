import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidarCampo } from 'src/app/helpers/validarCampo';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form!: FormGroup;

  constructor(public fb:FormBuilder) { }

  get f():any {return this.form.controls;}

  ngOnInit(): void {
    this.validacao();
  }

  private validacao():void {

    const formOptions: AbstractControlOptions ={
      validators: ValidarCampo.Comparar('senha','confirmeSenha')
    };

    this.form =this.fb.group({
      primeiroNome:['',Validators.required],
      ultimoNome:['',Validators.required],
      email:['',
      [Validators.required,Validators.email]
      ],
      usuario:['',Validators.required],
      senha:['',[Validators.required,Validators.minLength(6)]],
      confirmeSenha:['', Validators.required]
    },formOptions);
  }
}

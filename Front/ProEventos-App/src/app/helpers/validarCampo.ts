import { AbstractControl, FormGroup } from "@angular/forms";

export class ValidarCampo {
   static Comparar(controlName: string, ComparaControlName: string): any{
    return (grupo: AbstractControl) => {
        const formGroup = grupo as FormGroup;
        const control = formGroup.controls[controlName];
        const comparaControl = formGroup.controls[ComparaControlName];

        if (comparaControl.errors && !comparaControl.errors.comErro){
            return null;
        }

        if (control.value !==comparaControl.value){
            comparaControl.setErrors({comErro: true});

        }else{
            comparaControl.setErrors(null);
        }
        return null;
    };
   } 
}

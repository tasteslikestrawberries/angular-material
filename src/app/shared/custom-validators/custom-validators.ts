import { ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';

//the need to call the function in the validators array depends on the function implementation

//have to call this function in the validators array - have to use when passing a parameter
/*export const validateAge = (year: number): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value) return null;
        return control.value - ... ? null : { invalidAge: true };
    };
};*/

//don't have to call this function in the validators array - use when not passing a parameter
export const ageValidator: ValidationErrors | null = (
    control: AbstractControl
) => {
    if (!control.value) return null;
    return control.value >=18 ? null : { invalidAge: true };
};

//ASYNC VALIDATORS




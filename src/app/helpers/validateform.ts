import { FormGroup, FormControl } from "@angular/forms";

export default class ValidateForm{
    static validateAllFormFields(formGroup: FormGroup){
        Object.keys(formGroup.controls).forEach(fields => {
          const control = formGroup.get(fields);
          if (control instanceof FormControl) {
            control.markAsDirty({onlySelf: true});
          } else if (control instanceof FormGroup) {
            this.validateAllFormFields(control)
          }
        })
      }
}
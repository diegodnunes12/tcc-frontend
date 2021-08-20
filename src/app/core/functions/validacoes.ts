import { FormControl, FormGroup } from "@angular/forms";

export class Validacoes {
  static isEqualTo(control: string) {
    const validator = (formControl: FormControl) => {
      if (!formControl.root || !(<FormGroup>formControl.root).controls) {
        return null;
      }

      const field = (<FormGroup>formControl.root).get(control);

      if (!field) {
        throw new Error('É necessário informar um campo válido.');
      }

      if (field.value !== formControl.value) {
        return { equalsTo: control };
      }

      return null;
    };
    return validator;
  }
}

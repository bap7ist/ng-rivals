import { FormControl, FormGroup } from '@angular/forms';

export type TypedFormGroup<T> = FormGroup & {
  value: T;
  getRawValue(): T;
};

export function toFormGroup<T>(formGroup: FormGroup): TypedFormGroup<T> {
  return formGroup as TypedFormGroup<T>;
}

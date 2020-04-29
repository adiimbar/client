import { AbstractControl } from "@angular/forms";

export function PasswordCrossFieldValidator(control: AbstractControl): {[key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password.pristine || confirmPassword.pristine) {
        return null;
    }
    const condition = password && confirmPassword && password.value !== confirmPassword.value;
    
    return condition ? { passwordsDoNotMatch: true} : null;
    
}
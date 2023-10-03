import { FormBuilder, FormGroup, ValidatorFn, Validators } from "@angular/forms";

export class RegisterPageForm{

    private formBuilder: FormBuilder;
    private form: FormGroup;

    constructor(formBuilder: FormBuilder){
        this.formBuilder = formBuilder;
        this.form = this.createForm();
    }

    createForm(){
        let form = this.formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            repeatPassword: [''],
            img: [''],
            education: [''],
            dob: [''],
            gender: [''],
            company: [''],
        });

        form.get('repeatPassword')?.setValidators(matchPassword(form));

        return form;
    }

    getForm(){
        return this.form;
    }
}

function matchPassword(formGroup: FormGroup) : ValidatorFn {
    const password = formGroup.get('password');
    const repeatPassword = formGroup.get('repeatPassword');
    
    const validator = () => {
        if (!password || !repeatPassword) return null;
        return password.value === repeatPassword.value ? null : { passwordNotMatch: true };
    }

    return validator;
}
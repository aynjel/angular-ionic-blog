import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class TodoPageForm{

    private formBuilder: FormBuilder;

    constructor(formBuilder: FormBuilder){
        this.formBuilder = formBuilder;
    }

    createForm(): FormGroup{
        return this.formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            description: ['', [Validators.required, Validators.maxLength(300)]],
        });
    }
}
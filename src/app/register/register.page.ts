import { Component, OnInit } from '@angular/core';
import { RegisterPageForm } from './form/register.page.form';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm!: RegisterPageForm;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
  }

  createForm(){
    this.registerForm = new RegisterPageForm(this.formBuilder);
  }

  register(){
    console.log(this.registerForm.getForm().value);
  }

}

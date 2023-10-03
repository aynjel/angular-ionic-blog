import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginPageForm } from './login.page.form';
import { Store } from '@ngrx/store';
import { hide, show } from 'src/store/loading/loading.actions';
import { AppState } from 'src/store/AppState';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.loginForm = new LoginPageForm(this.formBuilder).createForm();
  }

  login(){
    console.log(this.loginForm.value);
  }

  forgotEmailPassword(){
    this.store.dispatch(show());

    setTimeout(() => {
      this.store.dispatch(hide());
    }, 2000);
  }

}

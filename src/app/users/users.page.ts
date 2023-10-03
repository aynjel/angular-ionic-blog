import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { User, UserService } from '../services/user/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertController } from '@ionic/angular';  

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  @ViewChild(IonModal) modal?: IonModal;
  
  users: User[] = [];
  isEditForm: boolean = false;

  id?: number;
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  img: string = 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png';
  education: string = '';
  gender: string = '';
  dob: string = '';
  company: string = '';
  role: string = '';
  status: string = '';

  educations = [
    {
      name: "BSIT"
    },
    {
      name: "BSBA"
    },
    {
      name: "BSHRM"
    },
  ];

  genders = [
    {
      name: "Male"
    },
    {
      name: "Female"
    },
  ];

  cancel() {
    this.modal?.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal?.dismiss({
      name: this.name,
      email: this.email,
      password: this.password,
      img: this.img,
      education: this.education,
      gender: this.gender,
      dob: this.dob,
      company: this.company,
    }, 'confirm-create');
  }

  onWillDismiss(event: Event) {
    const detail = (event as CustomEvent<OverlayEventDetail<any>>).detail;
    if (detail.role === 'confirm-create') {
      this.addUser({
        name: detail.data.name,
        email: detail.data.email,
        password: detail.data.password,
        img: detail.data.img,
        education: detail.data.education,
        gender: detail.data.gender,
        dob: detail.data.dob,
        company: detail.data.company,
      });
    }

    this.id = undefined;
    this.name = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.img = '';
    this.education = '';
    this.gender = '';
    this.dob = '';
    this.company = '';
    this.isEditForm = false;
  }

  openUser(user: User){
    this.isEditForm = true;
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.img = user.img;
    this.education = user.education;
    this.gender = user.gender;
    this.dob = user.dob;
    this.company = user.company;
    this.modal?.present();
  }

  constructor(
    private userService: UserService,
    public alertController: AlertController,
    ) {
      this.LoadUsers();
    }

  ngOnInit() { }

  LoadUsers() {
    this.userService.getUsers()
    .subscribe({
      next: (users: User[]) => {
        this.users = users;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    });
  }

  addUser(user: User) {
    // check id password and confirm password are the same
    if (user.password !== this.confirmPassword) {
      this.alertController.create({
        header: 'Password Mismatch',
        message: 'Password and Confirm Password must be the same.',
        buttons: ['OK']
      }).then(alert => {
        alert.present();
      });
      return;
    }
    // check if user data is not empty
    if (Object.keys(user).length !== 0) {
      this.userService.addUser(user)
      .subscribe({
        next: (data: User) => {
          this.LoadUsers();
          console.log(data);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      });
    }
  }

}

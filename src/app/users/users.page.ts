import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  users = [
    {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'lean@gmail.com',
      phone: '1-770-736-8031 x56442',
      avatar: 'https://image.lexica.art/full_jpg/34e56304-34e0-44c6-8a56-4c1a83d0ef47',
      website: 'hildegard.org'
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      email: 'ervin@gmail.com',
      phone: '010-692-6593 x09125',
      avatar: 'https://i.pinimg.com/736x/41/9c/7d/419c7d36a42168e580488bec67306eeb.jpg',
      website: 'anastasia.net'
    },
    {
      id: 3,
      name: 'Clementine Bauch',
      username: 'Samantha',
      email: 'clemen@gmail.com',
      phone: '1-463-123-4447',
      avatar: 'https://byuc.files.wordpress.com/2012/07/avat-2.jpg',
      website: 'ramiro.info'
    },
    {
      id: 4,
      name: 'Patricia Lebsack',
      username: 'Karianne',
      email: 'pat@gmail.com',
      phone: '493-170-9623 x156',
      avatar: 'https://img.freepik.com/premium-vector/avatar-woman-with-brown-hair-red-top_825692-913.jpg?w=2000',
      website: 'kale.biz'
    },
  ];

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
    {
      name: "LGBTQ"
    },
  ];
  
  @ViewChild(IonModal) modal?: IonModal;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name?: string;

  cancel() {
    this.modal?.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal?.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { BlogService, Blog } from '../services/blog/blog.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.page.html',
  styleUrls: ['./blogs.page.scss'],
})
export class BlogsPage implements OnInit {

  @ViewChild(IonModal) modal?: IonModal;
  
  blogs?: Blog[];
  
  isEditForm: boolean = false;

  id?: number;
  title: string = '';
  content: string = '';

  constructor(
    private blogService: BlogService,
    public alertController: AlertController,
    ) {
      this.LoadBlogs();
    }

  cancel() {
    this.modal?.dismiss(null, 'cancel');
    this.title = '';
    this.content = '';
    this.isEditForm = false;
  }

  confirm() {
    if (this.isEditForm) {
      this.modal?.dismiss({
        id: this.id,
        title: this.title,
        content: this.content,
      }, 'confirm-edit');
    }else {
      this.modal?.dismiss({
        title: this.title,
        content: this.content,
      }, 'confirm-create');
    }
    this.title = '';
    this.content = '';
    this.isEditForm = false;
  }

  onWillDismiss(event: Event) {
    const detail = (event as CustomEvent<OverlayEventDetail<any>>).detail;
    if (detail.role === 'confirm-create') {
      // console.log(detail.data);
      this.addBlog({
        title: detail.data.title,
        content: detail.data.content,
      });
    }else if (detail.role === 'confirm-edit') {
      this.updateBlog({
        id: detail.data.id,
        title: detail.data.title,
        content: detail.data.content,
      });
    }else if (detail.role === 'confirm-delete') {
      this.deleteBlog({
        id: detail.data.id,
        title: detail.data.title,
        content: detail.data.content,
      });
    }
  }

  openBlog(blog: Blog) {
    this.isEditForm = true;
    this.id = blog.id;
    this.title = blog.title;
    this.content = blog.content;
    this.modal?.present();
  }

  delete() {
    this.alertController.create({
      header: 'Delete Blog',
      message: 'Are you sure you want to delete this blog?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.alertController.dismiss();
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.modal?.dismiss({
              id: this.id,
              title: this.title,
              content: this.content,
            }, 'confirm-delete');
            this.title = '';
            this.content = '';
            this.isEditForm = false;
          }
        }
      ]
    }).then(alert => {
      alert.present();
    });
  }

  ngOnInit() { }

  LoadBlogs() {
    this.blogService.getBlogs()
    .subscribe({
      next: (data: Blog[]) => {
        this.blogs = data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    });
  }

  addBlog(blog: Blog) {
    console.log(blog);
    if (blog.title !== '' && blog.content !== '') {
      this.blogService.addBlog(blog)
      .subscribe({
        next: (data: Blog) => {
          this.LoadBlogs();
          console.log(data);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      });
    }
  }

  updateBlog(blog: Blog) {
    if (blog.title !== '' && blog.content !== '') {
      this.blogService.updateBlog(blog)
      .subscribe({
        next: (data: Blog) => {
          this.LoadBlogs();
          console.log(data);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      });
    }
  }

  deleteBlog(blog: Blog) {
    this.blogService.deleteBlog(blog)
    .subscribe({
      next: (data: Blog) => {
        this.LoadBlogs();
        console.log(data);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    });
  }

}

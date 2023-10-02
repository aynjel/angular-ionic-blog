import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { BlogService, Blog } from '../services/blog.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, map, retry } from 'rxjs';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.page.html',
  styleUrls: ['./blogs.page.scss'],
})
export class BlogsPage implements OnInit {

  @ViewChild(IonModal) modal?: IonModal;
  
  title: string = '';
  content: string = '';

  blogs: Blog[] = [];

  constructor(
    private blogService: BlogService,
    ) { }

  cancel() {
    this.modal?.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal?.dismiss({
      title: this.title,
      content: this.content,
    }, 'confirm');
  }

  onWillDismiss(event: Event) {
    const detail = (event as CustomEvent<OverlayEventDetail<any>>).detail;
    if (detail.role === 'confirm') {
      console.log(detail.data);
      this.blogService.createBlog(detail.data)
      .subscribe({
        next: (data: Blog) => {
          console.log(data);
          this.LoadBlogs();
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        },
        complete: () => {
          console.log('Completed');
        }
      });
    }
  }


  ngOnInit() {
    this.LoadBlogs();
  }

  LoadBlogs() {
    this.blogService.getBlogs()
    .pipe(
      map((data: Blog[]) => {
        return data.map((blog: Blog) => {
          return {
            id: blog.id,
            title: `${blog.title} Title`,
            content: blog.content,
          };
        });
      }),
      retry(3),
      catchError((err: HttpErrorResponse) => {
        console.log(err);
        return [];
      })
    )
    .subscribe({
      next: (data: Blog[]) => {
        this.blogs = data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
      complete: () => {
        console.log('Completed');
      }
    });
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Blog {
  id: number;
  title: string;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class BlogService{

  apiUrl = 'http://localhost:8085/api/blogs';

  blogs: Blog[] = [];

  headerOptions = {
    withCredentials: 'true',
  };

  constructor(private http: HttpClient) { }

  getBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.apiUrl, {
      withCredentials: true
    });
  }

  createBlog(blog: Blog): Observable<Blog> {
    return this.http.post<Blog>(`${this.apiUrl}/create`, blog, {
      withCredentials: true
    });
  }
}

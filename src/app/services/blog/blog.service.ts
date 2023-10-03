import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Blog {
  id?: number;
  title: string;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class BlogService{

  apiUrl = 'http://localhost:8085/api/blogs';

  blogs: Blog[] = [];
  
  constructor(
    private http: HttpClient
    ) { }

  getBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.apiUrl);
  }

  getBlog(blog: Blog): Observable<Blog> {
    return this.http.get<Blog>(`${this.apiUrl}/${blog.id}`);
  }

  addBlog(blog: Blog): Observable<Blog> {
    return this.http.post<Blog>(`${this.apiUrl}/create`, blog);
  }

  updateBlog(blog: Blog): Observable<Blog> {
    return this.http.put<Blog>(`${this.apiUrl}/${blog.id}/update`, blog);
  }

  deleteBlog(blog: Blog): Observable<Blog> {
    return this.http.delete<Blog>(`${this.apiUrl}/${blog.id}/delete`);
  }
}

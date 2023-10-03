import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  img: string;
  education: string;
  dob: string;
  gender: string;
  company: string;
  role?: string;
  status?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = 'http://localhost:8085/api/users';

  users: User[] = [];

  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUser(user: User): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${user.id}`);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/create`, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${user.id}/update`, user);
  }

  deleteUser(user: User): Observable<User> {
    return this.http.delete<User>(`${this.apiUrl}/${user.id}/delete`);
  }
}

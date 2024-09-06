import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetUsersResponse } from './user-result.model';

@Injectable({
  providedIn: 'root',
})
export class UserHttpService {
  constructor(private readonly httpClient: HttpClient) {}
  private readonly apiUrl = 'https://randomuser.me/api';

  /**
   * Fetches 5000 mock users from the api
   */
  getUsers(page = 1) {
    return this.httpClient.get<GetUsersResponse>(`${this.apiUrl}?results=5000&seed=awork&page=${page}`);
  }
}

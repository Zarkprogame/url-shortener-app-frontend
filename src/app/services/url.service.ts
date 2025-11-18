import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Url, Urls } from '../interfaces/url.interface';
import { environment } from '../environments/environment';

interface ShortUrl {
  originalUrl: string;
  shortUrl: string;
  clicks: number;
  userId: string;
}

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  shortenUrl(originalUrl: string): Observable<Url> {
    return this.http.post<Url>(`${this.apiUrl}/shorten`, { originalUrl });
  }

  getAllUrls(): Observable<Urls> {
    return this.http.get<Urls>(`${this.apiUrl}/urls`);
  }

  getDetails(id: string): Observable<Url> {
    return this.http.get<Url>(`${this.apiUrl}/details/${id}`);
  }

  deleteUrl(id: string): Observable<Url> {
    return this.http.delete<Url>(`${this.apiUrl}/delete/${id}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MigrationModel } from '../models/migration.model';
import { environment } from 'src/environments/environment.development';
import { MigrationRequest } from '../models/migration-request.model';

@Injectable({
  providedIn: 'root'
})
export class MigrationService {

  constructor(private http: HttpClient) { }

  getUserMigrations(id: string): Observable<MigrationModel[]> {
    return this.http.get<MigrationModel[]>(`${environment.apiBaseUrl}/user/${id}/migrations`);
  }

  deleteMigration(id: string): Observable<string> {
    return this.http.delete<string>(`${environment.apiBaseUrl}/migration/${id}`);
  }

  getMigration(id: string): Observable<MigrationModel[]> {
    return this.http.get<MigrationModel[]>(`${environment.apiBaseUrl}/migration/${id}`);
  }

  createMigration(migration: MigrationRequest): Observable<string> {
    return this.http.post<string>(`${environment.apiBaseUrl}/migration`, migration);
  }

  uploadFile(file: File, prefix?: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    if (prefix) {
      formData.append('prefix', prefix);
    }
    return this.http.post(`${environment.apiBaseUrl}/files`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

}

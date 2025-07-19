import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatabaseSchema } from '../models/database-schema.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbModelGeneratorService {

  constructor(private httpClient: HttpClient) { }

  generateDatabaseModel(prompt: string):Observable<DatabaseSchema> {
    const url = 'http://127.0.0.1:8000/generate-schema';
    return this.httpClient.post<DatabaseSchema>(url, { prompt: prompt });
  }
}

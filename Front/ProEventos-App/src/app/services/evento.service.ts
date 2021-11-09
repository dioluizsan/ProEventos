import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../models/Evento';

@Injectable(
  // retirado pois o mesmo foi adicionado em app.module em providers
  //{  providedIn: 'root'}
  )
export class EventoService {

  baseURL = 'https://localhost:5001/Eventos';
constructor(private http:HttpClient) { }

  //getEventos(){
    //return this.http.get(this.baseURL);
  //}
  
  public getEventos(): Observable<Evento[]>{
      return this.http.get<Evento[]>(this.baseURL);
  }

  public getEventosBytema(tema: string): Observable<Evento[]>{
    return this.http.get<Evento[]>(`${this.baseURL}/${tema}/tema`);
  }

  public getEventoById(id:number): Observable<Evento>{
    return this.http.get<Evento>(`${this.baseURL}/${id}`);
  }

  public postEvento(evento: Evento): Observable<Evento>{
    return this.http.post<Evento>(this.baseURL,evento);
  }
  public putEvento(id:number, evento: Evento): Observable<Evento>{
      return this.http.put<Evento>(`${this.baseURL}/${id}`,evento);
  }

  public deleteEvento(id:number): Observable<string>{
    return this.http.delete<string>(`${this.baseURL}/${id}`);
  }
}

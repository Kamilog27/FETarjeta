import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {

  myAppUrl='https://localhost:7246/';
  myApiUrl='api/Tarjeta/'
  constructor(private http:HttpClient) { }
  getListTarjetas():Observable<any>{
    return this.http.get(this.myAppUrl+this.myApiUrl);
  }
  deleteTarjeta(id:number):Observable<any>{
    return this.http.delete(this.myAppUrl+this.myApiUrl+id);
  }
  postTarjeta(tarjeta:any):Observable<any>{
    return this.http.post(this.myAppUrl+this.myApiUrl,tarjeta);
  }
  putTarjeta(id:number,tarjeta:any):Observable<any>{
    return this.http.put(this.myAppUrl+this.myApiUrl+id,tarjeta);
  }
}

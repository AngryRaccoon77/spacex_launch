// spaceX.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Launch} from "../models/launch.model";


@Injectable({
  providedIn: 'root'
})
export class SpaceXService {
  private apiUrl = 'https://api.spacexdata.com/v5';


  constructor(private http: HttpClient) { }

  // Получение будущих запусков
  getUpcomingLaunches(): Observable<Launch[]> {
    return this.http.get<Launch[]>(`${this.apiUrl}/launches/upcoming`);
  }

  // Получение недавних запусков
  getRecentLaunches(): Observable<Launch[]> {
    console.log(this.apiUrl);
    return this.http.get<Launch[]>(`${this.apiUrl}/launches/latest`);
  }

  // Получение всех остальных запусков
  getOtherLaunches(): Observable<Launch[]> {
    return this.http.get<Launch[]>(`${this.apiUrl}/launches/past`);
  }

  getNextLaunches(): Observable<Launch> {
    console.log("мама я покакал");
    return this.http.get<Launch>(`${this.apiUrl}/launches/next`);
  }
}

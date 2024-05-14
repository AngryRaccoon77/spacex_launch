// spaceX.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';
import {Launch} from "../models/launch.model";
import {map, switchMap} from "rxjs/operators";
import {Rocket} from "../models/rocket";
import {CrewMember} from "../models/crewMember";
import {Launchpad} from "../models/lauchpads";
import {Payload} from "../models/payloads";



@Injectable({
  providedIn: 'root'
})
export class SpaceXService {
  private apiUrl = 'https://api.spacexdata.com/v4';


  constructor(private http: HttpClient) { }

    getUpcomingLaunches(): Observable<Launch[]> {
        return this.http.get<Launch[]>(`${this.apiUrl}/launches/upcoming`).pipe(
            switchMap(launches => {
                const requests = launches.map(launch => {
                    // Создаем массив запросов для получения информации о каждой ракете и каждом члене экипажа
                    const rocketRequest = this.getRocketById(launch.rocket).pipe(
                        map(rocket => {
                            // Заменяем id ракеты на ее имя
                            launch.rocket = rocket.name;
                            return launch;
                        })
                    );

                    const launchpadRequest = this.getLaunchpadById(launch.launchpad).pipe(
                        map(launchpad => {
                            // Заменяем id ракеты на ее имя
                            launch.launchpad = launchpad.name;
                            return launch;
                        })
                    );


                    const payloadsRequest = launch.payloads.map(payloadId => this.getPayloadById(payloadId).pipe(
                        map(payload => {
                            // Заменяем id члена экипажа на его имя
                            return payload.name + " " + payload.type;
                        })
                    ));



                    const crewRequests = launch.crew.map(crewId => this.getCrewMemberById(crewId).pipe(
                        map(crewMember => {
                            // Заменяем id члена экипажа на его имя
                            return crewMember.name;
                        })
                    ));


                    // Объединяем все запросы в один массив
                    return forkJoin([launchpadRequest, rocketRequest, ...payloadsRequest, ...crewRequests]).pipe(
                        map((results) => {
                            const [, , ...crewAndPayloadNames] = results;
                            const crewNames = crewAndPayloadNames.slice(0, launch.crew.length);
                            const payloadNames = crewAndPayloadNames.slice(launch.crew.length);
                            launch.crew = crewNames;
                            launch.payloads = payloadNames;
                            return launch;
                        })
                    );
                });

                // Возвращаем новый Observable, который будет ждать, пока все запросы не будут выполнены
                return forkJoin(requests);
            })
        );
    }
  // Получение недавних запусков
    getRecentLaunches(): Observable<Launch> {
        return this.http.get<Launch>(`${this.apiUrl}/launches/latest`).pipe(
            switchMap(launch => {
                const rocketRequest = this.getRocketById(launch.rocket).pipe(
                    map(rocket => {
                        launch.rocket = rocket.name;
                        return launch;
                    })
                );

                const launchpadRequest = this.getLaunchpadById(launch.launchpad).pipe(
                    map(launchpad => {
                        launch.launchpad = launchpad.name;
                        return launch;
                    })
                );

                const crewRequests = launch.crew.map(crewId => this.getCrewMemberById(crewId).pipe(
                    map(crewMember => {
                        return crewMember.name;
                    })
                ));

                const payloadsRequest = launch.payloads.map(payloadId => this.getPayloadById(payloadId).pipe(
                    map(payload => {
                        return payload.name + " " + payload.type;
                    })
                ));

                return forkJoin([launchpadRequest, rocketRequest, ...crewRequests, ...payloadsRequest]).pipe(
                    map((results) => {
                        const [, , ...crewAndPayloadNames] = results;
                        const crewNames = crewAndPayloadNames.slice(0, launch.crew.length);
                        const payloadNames = crewAndPayloadNames.slice(launch.crew.length);
                        launch.crew = crewNames;
                        launch.payloads = payloadNames;
                        return launch;
                    })
                );
            })
        );
    }
  // Получение всех остальных запусков
    getOtherLaunches(): Observable<Launch[]> {
        return this.http.get<Launch[]>(`${this.apiUrl}/launches/past`).pipe(
            switchMap(launches => {
                const requests = launches.map(launch => {
                    const rocketRequest = this.getRocketById(launch.rocket).pipe(
                        map(rocket => {
                            launch.rocket = rocket.name;
                            return launch;
                        })
                    );

                    const launchpadRequest = this.getLaunchpadById(launch.launchpad).pipe(
                        map(launchpad => {
                            launch.launchpad = launchpad.name;
                            return launch;
                        })
                    );

                    const payloadsRequest = launch.payloads.map(payloadId => this.getPayloadById(payloadId).pipe(
                        map(payload => {
                            return payload.name + " " + payload.type;
                        })
                    ));

                    const crewRequests = launch.crew.map(crewId => this.getCrewMemberById(crewId).pipe(
                        map(crewMember => {
                            return crewMember.name;
                        })
                    ));

                    return forkJoin([launchpadRequest, rocketRequest, ...payloadsRequest, ...crewRequests]).pipe(
                        map((results) => {
                            const [, , ...crewAndPayloadNames] = results;
                            const crewNames = crewAndPayloadNames.slice(0, launch.crew.length);
                            const payloadNames = crewAndPayloadNames.slice(launch.crew.length);
                            launch.crew = crewNames;
                            launch.payloads = payloadNames;
                            return launch;
                        })
                    );
                });

                return forkJoin(requests);
            })
        );
    }

    getNextLaunches(): Observable<Launch> {
        return this.http.get<Launch>(`${this.apiUrl}/launches/next`).pipe(
            switchMap(launch => {
                const rocketRequest = this.getRocketById(launch.rocket).pipe(
                    map(rocket => {
                        launch.rocket = rocket.name;
                        return launch;
                    })
                );

                const launchpadRequest = this.getLaunchpadById(launch.launchpad).pipe(
                    map(launchpad => {
                        launch.launchpad = launchpad.name;
                        return launch;
                    })
                );

                const payloadsRequest = launch.payloads.map(payloadId => this.getPayloadById(payloadId).pipe(
                    map(payload => {
                        return payload.name + " " + payload.type;
                    })
                ));

                return forkJoin([launchpadRequest, rocketRequest, ...payloadsRequest]).pipe(
                    map((results) => {
                        const [, , ...payloadNames] = results;
                        launch.payloads = payloadNames;
                        return launch;
                    })
                );
            })
        );
    }
  // Получение информации о ракете по id
  getRocketById(id: string): Observable<Rocket> {
    return this.http.get<Rocket>(`${this.apiUrl}/rockets/${id}`);
  }
  getCrewMemberById(id: string): Observable<CrewMember> {
        return this.http.get<CrewMember>(`${this.apiUrl}/crew/${id}`);
  }
  getLaunchpadById(id: string): Observable<Launchpad> {
      return this.http.get<Launchpad>(`${this.apiUrl}/launchpads/${id}`);
  }
    getPayloadById(id: string): Observable<Payload> {
        return this.http.get<Payload>(`${this.apiUrl}/payloads/${id}`);
    }

}

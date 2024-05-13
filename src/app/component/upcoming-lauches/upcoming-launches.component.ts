import { Component, OnInit } from '@angular/core';
import {AsyncPipe, NgForOf, NgIf, SlicePipe} from "@angular/common";
import { selectUpcomingLaunches} from "../../store/selectors/launch.selector";
import {map} from "rxjs/operators";
import * as LaunchActions from "../../store/actions/launch.action";
import {Observable} from "rxjs";
import {Launch} from "../../models/launch.model";
import {Store} from "@ngrx/store";
import {LaunchCardComponent} from "../launch-card/launch-card-component";
import {LaunchDetailComponent} from "../launch-detail/launch-detail.component";

@Component({
    selector: 'app-upcoming-launches',
    templateUrl: 'upcoming-launches.component.html',
    styleUrls: ['upcoming-launches.component.css'],
    imports: [
        NgForOf,
        AsyncPipe,
        LaunchCardComponent,
        SlicePipe,
        LaunchDetailComponent,
        NgIf
    ],
    standalone: true
})
export class UpcomingLaunchesComponent implements OnInit {
    upcomingLaunches$!: Observable<Launch[]>;
    allLaunchesLoaded = false;
    length = 0;
    displayCount = 6; // количество отображаемых элементов

    constructor(private store: Store) { }

    ngOnInit(): void {
        this.upcomingLaunches$ = this.store.select(selectUpcomingLaunches);
        this.upcomingLaunches$ = this.upcomingLaunches$.pipe(
            map(value => Array.isArray(value) ? value : [value])
        );
        this.upcomingLaunches$.subscribe(launches => {
            this.length = launches.length;
        });
        this.store.dispatch(LaunchActions.loadUpcomingLaunches());
    }

  showMore(): void {
    if (this.displayCount < this.length) {
      this.displayCount += 6; // увеличиваем количество отображаемых элементов
      if (this.displayCount >= this.length) {
        this.allLaunchesLoaded = true; // отображаем все элементы
      }
    }
  }
    showLess(): void {
        this.displayCount = 6; // уменьшаем количество отображаемых элементов
        this.allLaunchesLoaded = false;
    }
    selectedLaunch!: Launch;


    onLaunchSelected(launch: Launch) {
        this.selectedLaunch = launch;
    }
}

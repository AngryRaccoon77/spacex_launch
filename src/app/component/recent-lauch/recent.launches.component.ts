import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as LaunchActions from '../../store/actions/launch.action';
import * as LaunchSelectors from '../../store/selectors/launch.selector';
import {AsyncPipe, NgForOf} from "@angular/common";
import {Launch} from "../../models/launch.model";
import {selectRecentLaunches} from "../../store/selectors/launch.selector";
import {map} from "rxjs/operators";
import {LaunchCardComponent} from "../launch-card/launch-card-component";
import {LaunchDetailComponent} from "../launch-detail/launch-detail.component";

@Component({
  selector: 'app-recent-launches',
  templateUrl: './recent-launches.component.html',
  styleUrls: ['./recent-launches.component.css'],
  imports: [
    AsyncPipe,
    NgForOf,
    LaunchCardComponent,
    LaunchDetailComponent
  ],
  standalone: true
})
export class LaunchComponent implements OnInit {

  recentLaunches$!: Observable<Launch[]>;


  constructor(private store: Store){}

  ngOnInit(): void {
    this.recentLaunches$ = this.store.select(selectRecentLaunches);
    this.recentLaunches$ = this.recentLaunches$.pipe(
        map(value => Array.isArray(value) ? value : [value])
    );
    this.store.dispatch(LaunchActions.loadRecentLaunches());
  }

  selectedLaunch!: Launch;

  onLaunchSelected(launch: Launch) {
    this.selectedLaunch = launch;
  }
}

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as LaunchActions from '../../store/actions/launch.action';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
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
    LaunchDetailComponent,
    NgIf
  ],
  standalone: true
})
export class LaunchComponent implements OnInit {

  recentLaunch$!: Observable<Launch | null>;


  constructor(private store: Store){}

  ngOnInit(): void {
    this.recentLaunch$ = this.store.select(selectRecentLaunches);
    this.store.dispatch(LaunchActions.loadRecentLaunch());
  }

  selectedLaunch!: Launch;

  onLaunchSelected(launch: Launch) {
    this.selectedLaunch = launch;
  }
}

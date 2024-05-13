import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {Observable} from 'rxjs';

import {selectNextLaunch} from '../../store/selectors/launch.selector';
import {Launch} from "../../models/launch.model";
import {AsyncPipe, DatePipe, NgIf, NgOptimizedImage} from "@angular/common";
import * as LaunchActions from "../../store/actions/launch.action";
import {CountdownComponent} from "../countdown/countdown.component";
import {Router} from "@angular/router";

@Component({
    selector: 'app-next-launch',
    templateUrl: './next-launch.component.html',
    styleUrls: ['./next-launch.component.css'],
  imports: [
    NgIf,
    AsyncPipe,
    DatePipe,
    CountdownComponent,
    NgOptimizedImage
  ],
    standalone: true,
    providers: []
})
export class NextLaunchComponent implements OnInit {
    nextLaunch$!: Observable<Launch | null>;
    currentDate: number = new Date().getTime();
    iconUrl = 'assets/img/ship.png';


  constructor(private store: Store, private router: Router) {}

    ngOnInit(): void {
        this.nextLaunch$ = this.store.select(selectNextLaunch);
        this.store.dispatch(LaunchActions.loadNextLaunch());
    }
  startGame() {
    this.router.navigate(['/game']);
  }
}

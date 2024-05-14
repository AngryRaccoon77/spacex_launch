import { Component, OnInit } from '@angular/core';
import {AsyncPipe, NgForOf, NgIf, SlicePipe} from "@angular/common";
import {map} from "rxjs/operators";
import * as LaunchActions from "../../store/actions/launch.action";
import {Observable} from "rxjs";
import {Launch} from "../../models/launch.model";
import {Store} from "@ngrx/store";
import {LaunchCardComponent} from "../launch-card/launch-card-component";
import {LaunchDetailComponent} from "../launch-detail/launch-detail.component";
import {selectOtherLaunches} from "../../store/selectors/launch.selector";

@Component({
    selector: 'app-past-launches',
    templateUrl: 'past-launches.component.html',
    styleUrls: ['past-launches.component.css'],
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
export class PastLaunchesComponent implements OnInit {
    pastLaunches$!: Observable<Launch[]>;
    allLaunchesLoaded = false;
    length = 0;
    displayCount = 6; // количество отображаемых элементов
    openCard: LaunchCardComponent | null = null;

    constructor(private store: Store) { }

    ngOnInit(): void {
        this.pastLaunches$ = this.store.select(selectOtherLaunches);
        this.pastLaunches$ = this.pastLaunches$.pipe(
            map(value => Array.isArray(value) ? value : [value])
        );
        this.pastLaunches$.subscribe(launches => {
            this.length = launches.length;
        });
        this.store.dispatch(LaunchActions.loadOtherLaunches());
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

    onLaunchSelected(launch: Launch, card: LaunchCardComponent) {
        this.closeOtherCards(card);
        this.selectedLaunch = launch;
    }

    closeOtherCards(openCard: LaunchCardComponent) {
        if (this.openCard && this.openCard !== openCard) {
            this.openCard.closeDetails();
        }
        this.openCard = openCard;
    }
}

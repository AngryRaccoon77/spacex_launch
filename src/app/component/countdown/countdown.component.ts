import { Component, Input, OnInit } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { map, switchMap, filter } from 'rxjs/operators';
import { Launch } from '../../models/launch.model';
import {AsyncPipe, NgIf} from "@angular/common";

@Component({
    selector: 'app-countdown',
    templateUrl: './countdown.component.html',
    styleUrls: ['./countdown.component.css'],
    imports: [
        AsyncPipe,
        NgIf
    ],
    standalone: true
})
export class CountdownComponent implements OnInit {
    @Input() nextLaunch$!: Observable<Launch | null>;
    countdown$!: Observable<string>;

    ngOnInit(): void {
        this.countdown$ = interval(1000).pipe(
            switchMap(() => this.nextLaunch$),
            map(nextLaunch => {
                const now = new Date();
                if (nextLaunch) {
                    const nextLaunchDate = new Date(nextLaunch.date_utc);
                    const diff = nextLaunchDate.getTime() - now.getTime();
                    const isPast = diff < 0;
                    const absoluteDiff = Math.abs(diff);
                    const sign = isPast ? '-' : '';

                    const days = Math.floor(absoluteDiff / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((absoluteDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((absoluteDiff % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((absoluteDiff % (1000 * 60)) / 1000);
                    return `  ${sign}${days} Дней ${hours < 10 ? '0' + hours : hours} Часов
                    ${minutes < 10 ? '0' + minutes : minutes} Минут ${seconds < 10 ? '0' + seconds : seconds} Секунд`;
                } else {
                    return null;
                }
            }),
            filter((timeString): timeString is string => timeString !== null)
        );
    }
}

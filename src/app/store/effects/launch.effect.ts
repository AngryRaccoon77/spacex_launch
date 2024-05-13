// launch.effect.ts

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { SpaceXService } from '../../service/spacex.service';
import * as LaunchActions from '../actions/launch.action';

@Injectable()
export class LaunchEffects {

    loadUpcomingLaunches$ = createEffect(() => this.actions$.pipe(
        ofType(LaunchActions.loadUpcomingLaunches),
        mergeMap(() => this.spaceXService.getUpcomingLaunches()
            .pipe(
                map(launches => LaunchActions.loadUpcomingLaunchesSuccess({ launches })),
                catchError(error => of(LaunchActions.loadLaunchesFailure({ error })))
            )
        )
    ));

    loadRecentLaunches$ = createEffect(() => this.actions$.pipe(
        ofType(LaunchActions.loadRecentLaunches),
        mergeMap(() => this.spaceXService.getRecentLaunches()
            .pipe(
                map(launches => LaunchActions.loadRecentLaunchesSuccess({ launches })),
                catchError(error => of(LaunchActions.loadLaunchesFailure({ error })))
            )
        )
    ));

    loadOtherLaunches$ = createEffect(() => this.actions$.pipe(
        ofType(LaunchActions.loadOtherLaunches),
        mergeMap(() => this.spaceXService.getOtherLaunches()
            .pipe(
                map(launches => LaunchActions.loadOtherLaunchesSuccess({ launches })),
                catchError(error => of(LaunchActions.loadLaunchesFailure({ error })))
            )
        )
    ));

loadNextLaunches$ = createEffect(() => this.actions$.pipe(
  ofType(LaunchActions.loadNextLaunch),
  mergeMap(() => {
    console.log('Sending request for next launches...');
    return this.spaceXService.getNextLaunches()
      .pipe(
        map(launch => {
          console.log('Request for next launches successful');
          return LaunchActions.loadNextLaunchSuccess({ launch });
        }),
        catchError(error => {
          console.log('Request for next launches failed', error);
          return of(LaunchActions.loadLaunchesFailure({ error }));
        })
      );
  })
));

    constructor(
        private actions$: Actions,
        private spaceXService: SpaceXService
    ) {}
}

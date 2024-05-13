// src/app/store/actions/launch.action.ts

import { createAction, props } from '@ngrx/store';
import { Launch } from '../../models/launch.model';

export const loadUpcomingLaunches = createAction(
    '[Launch] Load Upcoming Launches'
);

export const loadUpcomingLaunchesSuccess = createAction(
    '[Launch] Load Upcoming Launches Success',
    props<{ launches: Launch[] }>()
);

export const loadRecentLaunches = createAction(
    '[Launch] Load Recent Launches'
);

export const loadRecentLaunchesSuccess = createAction(
    '[Launch] Load Recent Launches Success',
    props<{ launches: Launch[] }>()
);

export const loadOtherLaunches = createAction(
    '[Launch] Load Other Launches'
);

export const loadOtherLaunchesSuccess = createAction(
    '[Launch] Load Other Launches Success',
    props<{ launches: Launch[] }>()
);

export const loadNextLaunch = createAction(
  '[Launch] Load Next Launches'
);

export const loadNextLaunchSuccess = createAction(
  '[Launch] Load Next Launches Success',
  props<{ launch: Launch }>()
);


export const loadLaunchesFailure = createAction(
    '[Launch] Load Launches Failure',
    props<{ error: any }>()
);

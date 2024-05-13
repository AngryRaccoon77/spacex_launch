// src/app/store/selectors/launch.selector.ts

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../reducers/launch.reducer';

export const selectLaunchState = createFeatureSelector<State>('launch');

export const selectUpcomingLaunches = createSelector(
    selectLaunchState,
    (state: State) => state.upcomingLaunches
);

export const selectRecentLaunches = createSelector(
    selectLaunchState,
    (state: State) => state.recentLaunches
);
export const selectOtherLaunches = createSelector(
    selectLaunchState,
    (state: State) => state.otherLaunches
);

export const selectNextLaunch = createSelector(
    selectLaunchState,
    (state: State) => state.nextLaunch
);
export const selectError = createSelector(
    selectLaunchState,
    (state: State) => state.error
);

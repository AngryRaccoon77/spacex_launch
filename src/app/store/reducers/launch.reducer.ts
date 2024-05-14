// src/app/store/reducers/launch.reducer.ts

import { createReducer, on } from '@ngrx/store';
import { Launch } from '../../models/launch.model';
import * as LaunchActions from '../actions/launch.action';

export interface State {
    upcomingLaunches: Launch[];
    recentLaunches: Launch | null;
    otherLaunches: Launch[];
    nextLaunch: Launch | null;
    error: any;
}

export const initialState: State = {
    upcomingLaunches: [],
    recentLaunches:  null,
    otherLaunches: [],
    nextLaunch: null,
    error: null
};

export const launchReducer = createReducer(
    initialState,
    on(LaunchActions.loadUpcomingLaunchesSuccess, (state, { launches }) => ({ ...state, upcomingLaunches: launches })),
    on(LaunchActions.loadRecentLaunchesSuccess, (state, { launch }) => ({ ...state, recentLaunches: launch })),
    on(LaunchActions.loadOtherLaunchesSuccess, (state, { launches }) => ({ ...state, otherLaunches: launches })),
    on(LaunchActions.loadNextLaunchSuccess, (state, { launch }) => ({ ...state, nextLaunch: launch })),
    on(LaunchActions.loadLaunchesFailure, (state, { error }) => ({ ...state, error }))
);

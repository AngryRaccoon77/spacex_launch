import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import {HttpClientModule} from '@angular/common/http';
import {LaunchComponent} from "./component/recent-lauch/recent.launches.component";
import {NextLaunchComponent} from "./component/next-lauch/next-launch.compoent";
import {HeaderComponent} from "./component/header/header.component";
import {UpcomingLaunchesComponent} from "./component/upcoming-lauches/upcoming-launches.component";

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [RouterOutlet, LaunchComponent, NextLaunchComponent, HeaderComponent, UpcomingLaunchesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SpaceXLaunch';
}

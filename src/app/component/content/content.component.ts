import { Component } from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {NextLaunchComponent} from "../next-lauch/next-launch.compoent";
import {LaunchComponent} from "../recent-lauch/recent.launches.component";
import {UpcomingLaunchesComponent} from "../upcoming-lauches/upcoming-launches.component";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['content.component.css'],
  imports: [
    HeaderComponent,
    NextLaunchComponent,
    LaunchComponent,
    UpcomingLaunchesComponent
  ],
  standalone: true
})
export class ContentComponent {
  constructor() { }
}

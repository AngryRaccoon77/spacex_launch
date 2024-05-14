import { Component, Input } from '@angular/core';
import { Launch } from '../../models/launch.model';
import {DatePipe, NgForOf, NgIf, NgStyle} from "@angular/common";

@Component({
  selector: 'app-launch-detail',
  templateUrl: './launch-detail.component.html',
  styleUrls: ['./launch-detail.component.css'],
  imports: [
    NgIf,
    NgForOf,
    NgStyle,
    DatePipe
  ],
  standalone: true
})
export class LaunchDetailComponent {
  @Input() launch!: Launch;
}

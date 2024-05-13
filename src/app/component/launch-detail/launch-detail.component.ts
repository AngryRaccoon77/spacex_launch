import { Component, Input } from '@angular/core';
import { Launch } from '../../models/launch.model';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-launch-detail',
  templateUrl: './launch-detail.component.html',
  styleUrls: ['./launch-detail.component.css'],
  imports: [
    NgIf
  ],
  standalone: true
})
export class LaunchDetailComponent {
  @Input() launch!: Launch;
}

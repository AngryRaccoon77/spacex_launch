import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Launch } from '../../models/launch.model';
import {DatePipe, NgIf, NgOptimizedImage} from "@angular/common";
import {LaunchDetailComponent} from "../launch-detail/launch-detail.component";

@Component({
    selector: 'app-launch-card',
    templateUrl: './launch-card.component.html',
    styleUrls: ['./launch-card.component.css'],
  exportAs: 'LaunchCardComponent',
  providers: [DatePipe],
    imports: [
        DatePipe,
        LaunchDetailComponent,
        NgIf,
        NgOptimizedImage
    ],
    standalone: true
})
export class LaunchCardComponent {
    @Input() launch!: Launch;
    @Output() selected = new EventEmitter<Launch>();
  @Output() opened = new EventEmitter<void>();
    showDetails = false;

  selectLaunch() {
    this.showDetails = !this.showDetails;
    if (this.showDetails) {
      this.opened.emit();
    }
    this.selected.emit(this.launch);
  }
  closeDetails() {
    this.showDetails = false;
  }

}

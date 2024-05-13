import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Launch } from '../../models/launch.model';
import {DatePipe, NgIf} from "@angular/common";
import {LaunchDetailComponent} from "../launch-detail/launch-detail.component";

@Component({
    selector: 'app-launch-card',
    templateUrl: './launch-card.component.html',
    styleUrls: ['./launch-card.component.css'],
    imports: [
        DatePipe,
        LaunchDetailComponent,
        NgIf
    ],
    standalone: true
})
export class LaunchCardComponent {
    @Input() launch!: Launch;
    @Output() selected = new EventEmitter<Launch>();
    showDetails = false;

    selectLaunch() {
        this.showDetails = !this.showDetails;
        this.selected.emit(this.launch);
    }
    closeCard() {
        this.selected.emit(undefined);
    }
}

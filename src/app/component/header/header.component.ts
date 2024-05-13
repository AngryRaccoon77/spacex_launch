import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Launch } from '../../models/launch.model';
import {CountdownComponent} from "../countdown/countdown.component";
import {NgOptimizedImage} from "@angular/common";
import {selectNextLaunch} from "../../store/selectors/launch.selector";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    standalone: true,
    imports: [
        CountdownComponent,
        NgOptimizedImage
    ]
})
export class HeaderComponent implements OnInit {
    logoUrl = 'assets/img/SpaceX_Logo_Black.png';
    nextLaunch$!: Observable<Launch | null>;

    constructor(private store: Store, private router: Router) { }
    // Здесь вы должны инициализировать nextLaunch$ с вашими данными о следующем запуске
    ngOnInit(): void {
        this.nextLaunch$ = this.store.select(selectNextLaunch);// ваш код для получения данных о следующем запуске
    }
  yankeesGoHome() {
    this.router.navigate(['/home']);
  }
}

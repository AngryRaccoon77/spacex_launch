import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './component/game/game.component';
import {NgModule} from "@angular/core";
import {ContentComponent} from "./component/content/content.component";
export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: ContentComponent },
  { path: 'game', component: GameComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

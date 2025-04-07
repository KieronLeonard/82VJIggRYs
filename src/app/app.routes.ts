import { Routes } from '@angular/router';
import {TimelineComponent} from './timeline/timeline.component';

export const routes: Routes = 
[
    {path: '', pathMatch: 'full', redirectTo: 'home'},
    { path: 'home', component: TimelineComponent}

];

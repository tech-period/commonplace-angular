import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-nav-list',
  imports: [
    MatListModule,
  ],
  templateUrl: './nav-list.component.html',
  styleUrl: './nav-list.component.scss'
})
export class NavListComponent {

  sampleList = [
    { path: '', component: '' },
    { path: 'sample1', component: 'SampleA' },
    { path: 'sample2', component: 'SampleB' },
    { path: 'sample3', component: 'SampleC' },
  ]
}

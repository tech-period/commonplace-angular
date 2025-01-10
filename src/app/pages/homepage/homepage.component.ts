import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-homepage',
  imports: [
    MatCardModule
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
  title = 'commonplace-angular';

  cardTitles:string[] = [
    'sample1',
    'sample2',
    'sample3',
  ];
}

import { Component, HostListener, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { userDetails } from './store/state/details.state';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  title = 'Name_Flow_Client';
  ngOnInit(): void {
    if (
      typeof window !== 'undefined' &&
      typeof window.localStorage !== 'undefined'
    ) {
      // Safe to use sessionStorage
      window.sessionStorage.clear();
    } else {
      // Handle the case where sessionStorage is not available
      console.warn('localStorageis not available.');
    }
  }

}

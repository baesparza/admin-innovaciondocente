import { Component, OnInit } from '@angular/core';

import { AuthService } from "src/app/shared/services/auth.service";

@Component({
  selector: 'id-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  signOut() {
    this.auth.signOut();
  }
}

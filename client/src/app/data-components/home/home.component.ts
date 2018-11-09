import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/shared-services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title: string;
  isAdmin: boolean;

  constructor(
    private data: DataService
  ) {
    this.title = "Home";
    this.isAdmin = false;
  }

  ngOnInit() {
    this.checkAdmin();
  }

  checkAdmin() {
    if (!this.data.getAdminFromTokenBool()) {
      this.isAdmin = false;
    } else {
      this.isAdmin = true;
    }
  }

}

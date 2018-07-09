import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-clienti-detail',
  templateUrl: './clienti-detail.component.html',
  styleUrls: ['./clienti-detail.component.css']
})
export class ClientiDetailComponent implements OnInit {

  cliente = {};

  constructor(private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit() {
    this.getCustomerDetails(this.route.snapshot.params['id']);
  }

  getCustomerDetails(id) {
    this.api.getCustomer(id)
      .subscribe(data => {
        console.log(data);
        this.cliente = data;
      });
  }

}

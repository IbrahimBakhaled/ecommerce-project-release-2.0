import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  name;

  constructor(private  httpClient : HttpClient) { }

  ngOnInit(): void {

    this.getUserInfo().subscribe(data => {
      this.name = data.name;
      console.log(this.name);
    });
  }

  getUserInfo() : Observable<any>{
    return this.httpClient.get(environment.baseUrl + '/v1/home');
  }

}

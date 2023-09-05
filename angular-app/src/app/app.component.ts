import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpInterceptor } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  constructor(private http: HttpClient) {}

  id: any;
  name: any;

  ngOnInit() {
    this.http.get<any>('http://localhost:3000/api/resource').subscribe(data => {
      this.id = data[0].id;
      this.name = data[0].name;
    })  
  }
}
// api-integration.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface ApiData {
  // Define the structure of your API response data here
  // Example: title: string;
}

@Component({
  selector: 'app-api-integration',
  templateUrl: './api-integration.component.html',
  styleUrls: ['./api-integration.component.css'],
})
export class ApiIntegrationComponent implements OnInit {
  apiData: ApiData | null = null;
  loading: boolean = false;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchApiData();
  }

  fetchApiData(): void {
    this.loading = true;
    this.http.get<ApiData>('https://jsonplaceholder.typicode.com/posts/1').subscribe(
      (data) => {
        this.apiData = data;
        this.loading = false;
      },
      (error) => {
        this.error = 'An error occurred while fetching data.';
        this.loading = false;
      }
    );
  }
}

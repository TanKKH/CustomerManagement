import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerProfile } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'http://localhost:5001/api/customer';

  constructor(private http: HttpClient) { }

  createCustomer(customer: CustomerProfile): Observable<CustomerProfile> {
    return this.http.post<CustomerProfile>(this.apiUrl, customer);
  }

  getCustomers(): Observable<CustomerProfile[]> {
    return this.http.get<CustomerProfile[]>(this.apiUrl);
  }

  getCustomerById(id: number): Observable<CustomerProfile> {
    return this.http.get<CustomerProfile>(`${this.apiUrl}/${id}`);
  }

  updateCustomer(id: number, customer: CustomerProfile): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, customer);
  }

  deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
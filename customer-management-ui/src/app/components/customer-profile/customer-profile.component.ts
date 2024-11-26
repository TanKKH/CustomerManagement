import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { CustomerProfile } from '../../models/customer.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-profile',
  standalone: true, // Mark as standalone component
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="customer-form-container">
      <form [formGroup]="customerForm" (ngSubmit)="onSubmit()">
        <div>
          <label>First Name</label>
          <input type="text" formControlName="firstName">
          <div *ngIf="firstName.invalid && (firstName.dirty || firstName.touched)">
            <small *ngIf="firstName.errors?.['required']">First Name is required</small>
            <small *ngIf="firstName.errors?.['minlength']">Minimum 2 characters</small>
          </div>
        </div>

        <div>
          <label>Last Name</label>
          <input type="text" formControlName="lastName">
          <div *ngIf="lastName.invalid && (lastName.dirty || lastName.touched)">
            <small *ngIf="lastName.errors?.['required']">Last Name is required</small>
            <small *ngIf="lastName.errors?.['minlength']">Minimum 2 characters</small>
          </div>
        </div>

        <div>
          <label>Email</label>
          <input type="email" formControlName="email">
          <div *ngIf="email.invalid && (email.dirty || email.touched)">
            <small *ngIf="email.errors?.['required']">Email is required</small>
            <small *ngIf="email.errors?.['email']">Invalid email format</small>
          </div>
        </div>

        <div>
          <label>Date of Birth</label>
          <input type="date" formControlName="dateOfBirth">
          <div *ngIf="dateOfBirth.invalid && (dateOfBirth.dirty || dateOfBirth.touched)">
            <small *ngIf="dateOfBirth.errors?.['required']">Date of Birth is required</small>
          </div>
        </div>

        <div>
          <label>Address</label>
          <textarea formControlName="address"></textarea>
        </div>

        <button type="submit">Submit</button>
      </form>

    </div>
  `
})
export class CustomerProfileComponent implements OnInit {
  customerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.customerForm = this.fb.group({
      firstName: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]],
      lastName: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      dateOfBirth: ['', Validators.required],
      address: ['', Validators.maxLength(500)]
    });
  }

  onSubmit() {
    // Mark all fields as touched to show validation errors
    this.customerForm.markAllAsTouched();
  
    if (this.customerForm.valid) {
      const customer: CustomerProfile = this.customerForm.value;
      
      console.log('Submitting customer:', customer); // Debug log
  
      this.customerService.createCustomer(customer)
        .subscribe({
          next: (response) => {
            console.log('Customer created successfully', response);
            // Optionally reset the form
            this.customerForm.reset();
          },
          error: (error) => {
            console.error('Error creating customer', error);
            // Handle error (show user-friendly message)
            alert('Failed to create customer. Please try again.');
          }
        });
    } else {
      console.log('Form is invalid', this.customerForm.errors);
      // Optionally, log specific field errors
      Object.keys(this.customerForm.controls).forEach(key => {
        const control = this.customerForm.get(key);
        if (control?.invalid) {
          console.log(`${key} is invalid:`, control.errors);
        }
      });
    }
  }

  // Getters for easy form validation
  get firstName() { return this.customerForm.get('firstName')!; }
  get lastName() { return this.customerForm.get('lastName')!; }
  get email() { return this.customerForm.get('email')!; }
  get dateOfBirth() { return this.customerForm.get('dateOfBirth')!; }
}
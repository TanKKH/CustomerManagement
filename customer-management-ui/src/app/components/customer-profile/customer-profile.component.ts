import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { CustomerProfile } from '../../models/customer.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
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
        Validators.minLength(3),
        Validators.maxLength(50)
      ]],
      lastName: ['', [
        Validators.required,
        Validators.minLength(3),
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
      
      console.log('Submitting customer:', customer);
  
      this.customerService.createCustomer(customer)
        .subscribe({
          next: (response) => {
            console.log('Customer created successfully', response);
            // Reset the form
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
      // Log specific field errors
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
  get address() { return this.customerForm.get('address')!; }
}
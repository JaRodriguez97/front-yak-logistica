import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ContactService } from '../../../../core/services/contact.service';
import { ContactRequest } from '../../../../core/models/contact.model';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, ScrollRevealDirective],
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  private readonly fb = inject(FormBuilder);
  private readonly contactService = inject(ContactService);

  readonly isLoading = signal(false);
  readonly submitted = signal(false);
  readonly hasError = signal(false);
  readonly showValidationError = signal(false);

  readonly form = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    company:  ['', [Validators.required, Validators.minLength(2)]],
    phone:    ['', [Validators.required, Validators.pattern(/^(\s*\d\s*){10}$/)]],
    email:    ['', [Validators.required, Validators.email]],
    city:     ['', [Validators.required, Validators.minLength(3)]],
    interest: ['', Validators.required],
    message:  ['', [Validators.required, Validators.minLength(10)]],
  });

  isFieldInvalid(fieldName: string): boolean {
    const control = this.form.get(fieldName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  private sanitize(value: string): string {
    if (!value) return '';
    // Strip HTML tag brackets and code elements
    return value.replace(/<[^>]*>/g, '').trim();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.showValidationError.set(true);
      return;
    }

    this.isLoading.set(true);
    this.hasError.set(false);
    this.showValidationError.set(false);

    // Strip spaces/formatting and prepend prefix +57
    const rawPhone = this.form.value.phone!;
    const cleanPhone = `+57 ${rawPhone.replace(/\D/g, '')}`;

    const payload: ContactRequest = {
      fullName: this.sanitize(this.form.value.fullName!),
      company:  this.sanitize(this.form.value.company!),
      phone:    this.sanitize(cleanPhone),
      email:    this.sanitize(this.form.value.email!),
      city:     this.sanitize(this.form.value.city!),
      interest: this.sanitize(this.form.value.interest!),
      message:  this.sanitize(this.form.value.message!),
    };

    this.contactService.send(payload).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.submitted.set(true);
      },
      error: () => {
        this.isLoading.set(false);
        this.hasError.set(true);
      },
    });
  }
}

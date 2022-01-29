import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { IUser } from '../models/IUser';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  user!: IUser;

  myForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    date: [''],
  });

  get f() { return this.myForm.controls; }

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    this.user = this.myForm.value;
    this.myForm.reset()
  }
}

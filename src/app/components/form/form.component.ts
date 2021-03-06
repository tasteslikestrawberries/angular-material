import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { IUser } from '../../shared/models/IUser';
import { ageValidator } from 'src/app/shared/custom-validators/custom-validators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;

  user!: IUser;

  myForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    date: [''],
    age: ['', ageValidator],
  });

  get f() { return this.myForm.controls; } //for validators to access form values

  constructor(private fb: FormBuilder, private userService: UserService) {}

  onSubmit() {
    this.user = this.myForm.value;
    this.userService.addUser(this.user)
    this.formGroupDirective.resetForm() //resets both form and validators
  }
}

import {Component, Inject, OnInit} from '@angular/core';
import {differenceInCalendarDays} from "date-fns";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HipaaService} from "../../../../shared/rest-service/hipaa.service";
import {HttpErrorResponse} from "@angular/common/http";

export enum Status {
  Active = 'Active',
  Deactivate = 'Deactive',
}

@Component({
  selector: 'app-add-edit-grid-data',
  templateUrl: './add-edit-grid-data.component.html',
  styleUrls: ['./add-edit-grid-data.component.css']
})
export class AddEditGridDataComponent implements OnInit {
  readonly SIGNED = 'SIGNED';
  readonly EXPIRES = 'EXPIRES';

  signedDate = new Date();
  expiresDate = new Date();

  formGroup!: FormGroup;
  error: string = '';

  constructor(
    private dialogRef: MatDialogRef<AddEditGridDataComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private hipaaService: HipaaService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.createFormGroup();
    if (this.id) {
      this.formGroup.patchValue(this.data);
      this.signedDate = new Date(this.data.signedDate);
      this.expiresDate = new Date(this.data.expiresDate);
    }
  }

  /** Will Validate Expires Date always greater than signed date */
  onChangeDate = ($event: any, type: string) => {
    if (type == this.SIGNED) {
      const diffInDays = differenceInCalendarDays(this.expiresDate, this.signedDate);
      this.formGroup.get('signedDate')?.setValue($event);
      if (diffInDays < 0) {
        this.expiresDate = $event;
      }
    } else {
      this.formGroup.get('expiresDate')?.setValue($event);
    }
  }

  /** Disable All Future Date */
  disabledSignedDate = (current: Date): boolean => {
    return differenceInCalendarDays(current, new Date()) > 0;
  }

  /** Disable All Dates Before Signed Date */
  disabledExpiresDate = (current: Date): boolean => {
    return differenceInCalendarDays(current, this.signedDate) < 0;
  }

  /** Add Or Update item */
  upsert() {
    if (this.id) {
      this.updateData();
    } else {
      this.saveData();
    }
  }

  /** Add Update item */
  private saveData() {
    const data = this.formGroup.value;
    delete data.id;
    this.hipaaService.save(data).subscribe(response => {
      if (response) {
        this.dialogRef.close(true);
      }
    }, error => {
      this.displayError(error);
    });
  }

  /** Update item */
  private updateData() {
    this.hipaaService.update(this.formGroup.value).subscribe(response => {
      if (response) {
        this.dialogRef.close(true);
      }
    }, error => {
      this.displayError(error);
    });
  }
  /** Create Form Group */
  private createFormGroup() {
    this.formGroup = this.fb.group({
      id: new FormControl(this.id),
      signedDate: new FormControl(new Date()),
      expiresDate: new FormControl(new Date()),
      status: new FormControl(Status.Active),
      attachment: new FormControl(null)
    })
  }

  /** It will Display Error And hide after 5 seconds */
  private displayError(err: HttpErrorResponse) {
    this.error = AddEditGridDataComponent.getErrorMessageFromAPI(err);
    setTimeout(() => {
      this.error = '';
    }, 5000);
  }

  /** Return id of current item if popup opened for edit */
  get id() {
    return this.data ? this.data.id : null;
  }

  /** Evalute Error message from API response */
  static getErrorMessageFromAPI(error: HttpErrorResponse, msg?: string): string {
    try {
      if (error && error.message) {
        return error.message;
      } else {
        return msg || 'Something went wrong. Try Again.';
      }
    } catch (e) {
      return msg || 'Something went wrong. Try Again.';
    }
  }
}

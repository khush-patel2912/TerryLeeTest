import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-view-attachment-popup',
  templateUrl: './view-attachment-popup.component.html',
  styleUrls: ['./view-attachment-popup.component.css']
})
export class ViewAttachmentPopupComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private sanitizer: DomSanitizer
  ) {
  }

  /** This will give bse64 string with html safe url to avoid XSS */
  get getData() {
    return this.data ? this.sanitizer.bypassSecurityTrustResourceUrl(this.data.attachment) : null;
  }

}

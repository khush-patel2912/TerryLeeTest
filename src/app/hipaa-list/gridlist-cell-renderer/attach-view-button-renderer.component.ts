import {Component} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {NzUploadFile} from "ng-zorro-antd/upload";
import {AgGridAction} from "../../../shared/enums/AgGridAction";

@Component({
  selector: 'app-button-renderer',
  template: `
    <div class="add-edit-btn-container d-flex align-items-center justify-content-center">
      <nz-upload
        [nzShowUploadList]="false"
        nzFileType="image/png,image/jpeg,image/gif,image/bmp"
        [nzHeaders]="{ authorization: 'authorization-text' }"
        [nzBeforeUpload]="handleChange">
        <button nz-button nzType="text" nzSize="small" nz-tooltip nzTooltipTitle="Attach" nzTooltipPlacement="left">
          <i nz-icon nzType="upload" class="ic-color"></i>
        </button>
      </nz-upload>

      <button nz-button nzType="text" nzSize="small" nz-tooltip nzTooltipTitle="View" nzTooltipPlacement="right"
              (click)="onClick($event, VIEW)" *ngIf="isAttachmentAvailable">
        <i nz-icon nzType="eye" [nzTheme]="'fill'" class="ic-color"></i>
      </button>
    </div>
  `,
  styles: [
    '.ic-color { color: #A5A3A9 }',
    '.add-edit-btn-container { min-height: 100%;}'
  ]
})

export class AttachViewButtonRendererComponent implements ICellRendererAngularComp {
  readonly VIEW = AgGridAction.ViewAttachment;

  params: any;
  label!: string;

  agInit(params: any): void {
    this.params = params;
    this.label = this.params.label || null;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onClick($event: any, action: AgGridAction) {
    const params = {
      event: $event,
      action: action,
      rowData: this.params.node.data
    }
    this.params.onClick(params);
  }

  handleChange = (file: NzUploadFile, fileList: NzUploadFile[]) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file as any);
    fileReader.onloadend = (e) => {
      const data = this.params.node.data;
      data.attachment = fileReader.result;
      this.params.onFileSelect(data);
    };
    return false;
  }

  get isAttachmentAvailable() {
    return this.params && this.params.data && this.params.data.attachment;
  }

}

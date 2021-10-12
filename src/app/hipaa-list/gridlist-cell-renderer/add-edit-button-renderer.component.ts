import {Component} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {AgGridAction} from "../../../shared/enums/AgGridAction";
import {NzModalService} from "ng-zorro-antd/modal";

@Component({
  selector: 'app-button-renderer',
  template: `
    <div class="add-edit-btn-container d-flex align-items-center justify-content-center">
      <button nz-button nzType="text" nzSize="small" nzShape="circle" nz-tooltip nzTooltipTitle="Edit" nzTooltipPlacement="left" (click)="onClick($event, EDIT)"><i nz-icon nzType="edit" [nzTheme]="'fill'" class="ml-2 ic-color"></i></button>
      <button nz-button nzType="text" nzSize="small" nzShape="circle" nz-tooltip nzTooltipTitle="Delete" nzTooltipPlacement="right" (click)="showDeleteConfirm($event)"><i nz-icon nzType="delete" [nzTheme]="'fill'" class="ml-2 ic-color" nzTooltipTitle="Delete" nzTooltipPlacement="right"></i></button>
    </div>
  `,
  styles: [
    '.ic-color { color: #A5A3A9 }',
    '.add-edit-btn-container { min-height: 100%;}'
  ]
})

export class AddEditButtonRendererComponent implements ICellRendererAngularComp {
  readonly EDIT = AgGridAction.Edit;
  readonly DELETE = AgGridAction.Delete;

  params: any;
  label!: string;

  constructor(private modal: NzModalService) {
  }

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

  showDeleteConfirm($event: any): void {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this item?',
      nzContent: '<b style="color: red;">This item will not restore.</b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.onClick($event, this.DELETE),
      nzCancelText: 'No',
    });
  }
}

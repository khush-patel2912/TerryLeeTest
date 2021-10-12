import {Component, OnInit} from '@angular/core';
import {format} from "date-fns";
import {MatDialog} from "@angular/material/dialog";
import {HipaaService} from "../../shared/rest-service/hipaa.service";
import {AddEditButtonRendererComponent} from "./gridlist-cell-renderer/add-edit-button-renderer.component";
import {AttachViewButtonRendererComponent} from "./gridlist-cell-renderer/attach-view-button-renderer.component";
import {ViewAttachmentPopupComponent} from "./popup-component/view-attachment-popup/view-attachment-popup.component";
import {AgGridAction} from "../../shared/enums/AgGridAction";
import {AddEditGridDataComponent} from "./popup-component/add-edit-grid-data/add-edit-grid-data.component";
import {Hipaa} from "../../shared/model/hipaa";

@Component({
  selector: 'app-hipaa-list',
  templateUrl: './hipaa-list.component.html',
  styleUrls: ['./hipaa-list.component.css']
})
export class HipaaListComponent implements OnInit {

  private gridApi: any;
  frameworkComponents: any;

  rowData: Hipaa[] = [];
  columnDefs: any[] = [
    {headerName: 'STATUS', field: 'status'},
    {
      headerName: 'HIPAA SIGNED', field: 'signedDate',
      cellRenderer: (data: any) => {
        return format(new Date(data.value), 'dd/MM/yyyy');
      }
    },
    {
      headerName: 'HIPAA EXPIRES', field: 'expiresDate',
      cellRenderer: (data: any) => {
        return format(new Date(data.value), 'dd/MM/yyyy');
      }
    },
    {
      headerName: 'ATTACH/VIEW',
      cellRenderer: 'attachViewBtnRenderer',
      cellRendererParams: {
        onClick: this.onClickViewAttachment.bind(this),
        onFileSelect: this.fileSelect.bind(this)
      },
    },
    {
      headerName: 'EDIT/DELETE',
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        onClick: this.onEditDelete.bind(this)
      },
    }
  ];

  constructor(
    private dialog: MatDialog,
    private hipaaService: HipaaService
  ) {
    this.frameworkComponents = {
      buttonRenderer: AddEditButtonRendererComponent,
      attachViewBtnRenderer: AttachViewButtonRendererComponent
    }
  }

  ngOnInit(): void {
    this.getList();
  }

  /** SET COLUMN WIDTH AUTO SIZE */
  onFirstDataRendered(params: any) {
    params.api.sizeColumnsToFit();
  }

  /** STORE GRID API TO INTRACT WITH Ag-Grid FROM COMPONENT */
  onGridReady(params: any) {
    this.gridApi = params.api;
  }

  /** On File Select it will upload file to server in base64 format */
  fileSelect(data: any) {
    if (data) {
      this.hipaaService.update(data).subscribe(response => {
        if (response) {
          this.getList();
        }
      }, error => {
      });
    }
  }

  /** Open Popup To Display Attached File */
  onClickViewAttachment(data: any) {
    this.dialog.open(ViewAttachmentPopupComponent, {
      width: '500px',
      height: '500px',
      data: data.rowData
    });
  }

  /** Will Delete Data from List */
  onEditDelete(data: any) {
    if (data.action == AgGridAction.Edit) {
      this.upsertItem(data.rowData);
    } else if (data.action == AgGridAction.Delete) {
      this.deleteData(data.rowData.id);
    }
  }

  /** It will Either update or Save Data to DB */
  upsertItem(data?: any) {
    this.dialog.open(AddEditGridDataComponent, {
      width: '500px',
      data: data
    }).afterClosed().subscribe(response => {
      if (response) {
        this.getList();
      }
    });
  }

  /** Call API to delete data from db */
  private deleteData(id: string) {
    this.hipaaService.delete(id).subscribe(response => {
      if (response) {
        this.getList();
      }
    }, error => {
      console.log(error);
    });
  }

  /** List All Data From DB */
  private getList() {
    this.hipaaService.list().subscribe(response => {
      this.rowData = response;
    }, error => {
      console.log(error);
    });
  }
}

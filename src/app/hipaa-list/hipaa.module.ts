import {NgModule} from "@angular/core";
import {AddEditButtonRendererComponent} from "./gridlist-cell-renderer/add-edit-button-renderer.component";
import {ViewAttachmentPopupComponent} from "./popup-component/view-attachment-popup/view-attachment-popup.component";
import {AttachViewButtonRendererComponent} from "./gridlist-cell-renderer/attach-view-button-renderer.component";
import {AddEditGridDataComponent} from "./popup-component/add-edit-grid-data/add-edit-grid-data.component";
import {HipaaListComponent} from "./hipaa-list.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";
import {MatDividerModule} from "@angular/material/divider";
import {MatDialogModule} from "@angular/material/dialog";
import {NzUploadModule} from "ng-zorro-antd/upload";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzTypographyModule} from "ng-zorro-antd/typography";
import {AgGridModule} from "ag-grid-angular";
import {NzIconModule} from "ng-zorro-antd/icon";
import {IconDefinition} from "@ant-design/icons-angular";
import {PlusOutline} from "@ant-design/icons-angular/icons";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzAlertModule} from "ng-zorro-antd/alert";

const icons: IconDefinition[] = [PlusOutline];

@NgModule({
  declarations: [
    AddEditButtonRendererComponent,
    AttachViewButtonRendererComponent,
    AddEditGridDataComponent,
    ViewAttachmentPopupComponent,
    HipaaListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    NzIconModule.forRoot(icons),
    NzButtonModule,
    MatDialogModule,
    NzToolTipModule,
    NzUploadModule,
    MatDividerModule,
    MatDialogModule,
    NzFormModule,
    NzDatePickerModule,
    NzTypographyModule,
    NzModalModule,
    NzAlertModule
  ],
})
export class HipaaModule {
}

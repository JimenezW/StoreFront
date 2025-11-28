import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfigFormModal } from '../components/modalform/config-form-modal.model';
import { ActionModalEvent } from '../components/modalform/dynamic-modalform';
import { ModalformComponent } from '../components/modalform/modalform.component';

@Injectable({
  providedIn: 'root'
})
export class ModalFormService {

  constructor(private dialog: MatDialog) {}

  openFormModal(config: ConfigFormModal): Observable<ActionModalEvent> {

    const dialogRef = this.dialog.open(ModalformComponent, {
      width: config.width || '600px',
      data: config
    });

    // Retorna los datos emitidos desde el modal
    return dialogRef.afterClosed();
  }
}

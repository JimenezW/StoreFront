import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { AlertComponent } from "../components/alert/alert.component";
import { AlertData } from "../components/alert/alert.model";


@Injectable({
  providedIn: 'root'
})
export class MensajeAlertService {

  constructor(private dialog: MatDialog) { }

  private openDialog(data: AlertData): Observable<boolean> {
    const dialogRef = this.dialog.open(AlertComponent, {
      width: '400px',
      data: data,
      disableClose: true // Evita que el diálogo se cierre al hacer clic fuera
    });

    return dialogRef.afterClosed();
  }

  showSuccess(message: string, title: string = 'Éxito'): Observable<boolean> {
    return this.openDialog({ type: 'success', title, message });
  }

  showError(message: string, title: string = 'Error'): Observable<boolean> {
    return this.openDialog({ type: 'error', title, message });
  }

  showWarn(message: string, title: string = 'Advertencia'): Observable<boolean> {
    return this.openDialog({ type: 'warn', title, message });
  }

  showInfo(message: string, title: string = 'Información'): Observable<boolean> {
    return this.openDialog({ type: 'info', title, message });
  }

  showConfirm(message: string, title: string = 'Aviso'): Observable<boolean> {
    return this.openDialog({ type: 'confirm', title, message });
  }
}

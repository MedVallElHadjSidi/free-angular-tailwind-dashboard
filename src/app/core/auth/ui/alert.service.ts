import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class AlertService {

  error(title: string, message: string) {
    Swal.fire({
      icon: 'error',
      title,
      text: message,
      confirmButtonText: 'OK'
    });
  }

  success(title: string, message: string) {
    Swal.fire({
      icon: 'success',
      title,
      text: message,
      timer: 1500,
      showConfirmButton: false
    });
  }
}

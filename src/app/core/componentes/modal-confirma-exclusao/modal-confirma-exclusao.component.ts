import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-modal-confirma-exclusao',
  templateUrl: './modal-confirma-exclusao.component.html',
  styleUrls: ['./modal-confirma-exclusao.component.scss']
})
export class ModalConfirmaExclusaoComponent implements OnInit {
  public confirmed: Subject<boolean>;

  constructor(private _bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.confirmed = new Subject();
  }

  confirm(): void {
    this.confirmed.next(true);
    this._bsModalRef.hide();
  }

  cancel(): void {
      this.confirmed.next(false);
      this._bsModalRef.hide();
  }

}

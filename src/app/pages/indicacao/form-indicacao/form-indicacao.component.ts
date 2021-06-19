import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IndicacaoService } from '../../../_services/indicacao.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-indicacao',
  templateUrl: './form-indicacao.component.html',
  styleUrls: ['./form-indicacao.component.scss']
})
export class FormIndicacaoComponent implements OnInit {

  form: FormGroup;

  constructor(
    private indicacaoService: IndicacaoService,
    public dialogRef: MatDialogRef<FormIndicacaoComponent>,
    private _snakbar: MatSnackBar
  ) {
    this.form = new FormGroup({
      nome: new FormControl(null, [Validators.required]),
      cpf: new FormControl(null, [Validators.required, Validators.minLength(11), Validators.pattern("^[0-9]*$")]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      telefone: new FormControl(null, [Validators.required]),
    })
  }

  ngOnInit(): void {}

  closeModal() {
    this.dialogRef.close({success: false});
  }

  async save() {
    try {
      await this.indicacaoService.create(this.form.value);
      this.dialogRef.close({success: true});
    } catch (error) {
      this.dialogRef.close({success: false});
      this._snakbar.open(error.error.message_description, 'Erro', {duration: 4000});
    }
  }

}

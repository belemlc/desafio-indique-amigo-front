import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormIndicacaoComponent } from '../form-indicacao/form-indicacao.component';
import { IndicacaoService } from '../../../_services/indicacao.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StatusOptionsComponent } from '../status-options/status-options.component';

@Component({
  selector: 'app-list-indicacoes',
  templateUrl: './list-indicacoes.component.html',
  styleUrls: ['./list-indicacoes.component.scss']
})
export class ListIndicacoesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nome', 'cpf', 'telefone', 'email', 'status', 'actions'];
  dataSource: any = [];

  constructor(
    public dialog: MatDialog,
    private indicacaoService: IndicacaoService,
    private _snackBar: MatSnackBar,
  ) { }

  async ngOnInit() {
    this.getIndicacoes();
  }

  async getIndicacoes() {
    const response: any = await this.indicacaoService.all().toPromise();
    this.dataSource = response.data;
  }

  async openDialogForm() {

    const dialogRef = this.dialog.open(FormIndicacaoComponent);

    dialogRef.afterClosed().subscribe((data: any) => {

      if (data.success) {
        this.getIndicacoes();
        this._snackBar.open('Indicação criada com sucesso!', 'sucesso', {duration: 2000});
      }

    });
  }

  openStatusOptions(id: number) {
    const dialogRef = this.dialog.open(StatusOptionsComponent, {data: {id: id}});
    dialogRef.afterClosed().subscribe(() => {
      this.getIndicacoes();
    });
  }

  async delete(id: number) {
    try {
      await this.indicacaoService.delete(id);
      this._snackBar.open('Indicação excluída com sucesso!', 'sucesso', {duration: 2000});
      await this.getIndicacoes();
    } catch (error) {
      console.log(error);
    }
  }

}

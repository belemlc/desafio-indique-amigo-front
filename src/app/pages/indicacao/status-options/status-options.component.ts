import { Component, Inject, Input, OnInit } from '@angular/core';
import { StatusService } from '../../../_services/status.service';
import { IndicacaoService } from '../../../_services/indicacao.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-status-options',
  templateUrl: './status-options.component.html',
  styleUrls: ['./status-options.component.scss']
})
export class StatusOptionsComponent implements OnInit {

  status: any[] = [];
  selectedValue!: any;

  constructor(
    private statusService: StatusService,
    private indicacaoService: IndicacaoService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: {id: number}
  ) { }

  async ngOnInit() {
    const response: any = await this.statusService.all();
    this.status = response.data;
  }

  async mudarStatus() {
    try {
      const status = {status: this.selectedValue};
      await this.indicacaoService.update(status, this.data.id);
      this.dialog.closeAll();
    } catch (error) {
      console.log(error)
    }
  }

}

import { Component } from '@angular/core';
import { QueueService } from 'src/app/services/queue.service';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {
  relatorios: any = {
    emitidas: [],
    atendidas: [],
    naoAtendidas: [],
  };

  constructor(private queueService: QueueService) {}

  ionViewWillEnter() {
    this.relatorios = this.queueService.getRelatorios();
  }

  finalizarExpediente() {
    this.queueService.finalizarExpediente();
    this.relatorios = this.queueService.getRelatorios();
    alert('Expediente finalizado. Senhas restantes descartadas.');
  }
}

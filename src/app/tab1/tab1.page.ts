import { Component } from '@angular/core';
import { QueueService } from 'src/app/services/queue.service';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {
  constructor(private queueService: QueueService) {}

  emitSenha(type: 'SP' | 'SE' | 'SG') {
    const senha = this.queueService.emitSenha(type);
    alert(`Senha emitida: ${senha}`);
  }
}

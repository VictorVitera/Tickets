import { Component } from '@angular/core';
import { QueueService } from 'src/app/services/queue.service';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {
  lastCalled: string[] = [];

  constructor(private queueService: QueueService) {}

  callNext() {
    const next = this.queueService.callNext();
    if (next) {
      this.lastCalled.unshift(next);
      if (this.lastCalled.length > 5) this.lastCalled.pop();
    } else {
      alert('Nenhuma senha disponível!');
    }
  }
}

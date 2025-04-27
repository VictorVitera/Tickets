import { Injectable } from '@angular/core';

interface Senha {
  numero: string;
  tipo: 'SP' | 'SE' | 'SG';
  dataEmissao: Date;
  dataAtendimento?: Date;
  guiche?: number;
}

@Injectable({
  providedIn: 'root',
})
export class QueueService {
  private spQueue: Senha[] = [];
  private seQueue: Senha[] = [];
  private sgQueue: Senha[] = [];
  private atendidas: Senha[] = [];
  private naoAtendidas: Senha[] = [];
  private lastCalled: string = '';

  constructor() {}

  // Emitir senha
  emitSenha(type: 'SP' | 'SE' | 'SG'): string {
    const date = new Date();
    const yy = date.getFullYear().toString().slice(-2);
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const sequence = this.getSequence(type);
    const senha: Senha = {
      numero: `${yy}${mm}${dd}-${type}${sequence}`,
      tipo: type,
      dataEmissao: date,
    };
    if (type === 'SP') this.spQueue.push(senha);
    if (type === 'SE') this.seQueue.push(senha);
    if (type === 'SG') this.sgQueue.push(senha);
    return senha.numero;
  }

  // Chamar próxima senha
  callNext(): string | null {
    let nextSenha: Senha | undefined;
    if (this.lastCalled !== 'SP' && this.spQueue.length > 0) {
      nextSenha = this.spQueue.shift();
      this.lastCalled = 'SP';
    } else if (this.lastCalled === 'SP' && this.seQueue.length > 0) {
      nextSenha = this.seQueue.shift();
      this.lastCalled = 'SE';
    } else if (this.lastCalled === 'SP' && this.sgQueue.length > 0) {
      nextSenha = this.sgQueue.shift();
      this.lastCalled = 'SG';
    }

    if (nextSenha) {
      nextSenha.dataAtendimento = new Date();
      nextSenha.guiche = Math.floor(Math.random() * 5) + 1; // Simula guichê
      this.atendidas.push(nextSenha);
      return nextSenha.numero;
    }
    return null;
  }

  // Obter relatórios
  getRelatorios() {
    return {
      emitidas: [...this.spQueue, ...this.seQueue, ...this.sgQueue],
      atendidas: this.atendidas,
      naoAtendidas: this.naoAtendidas,
    };
  }

  // Finalizar expediente
  finalizarExpediente() {
    this.naoAtendidas.push(...this.spQueue, ...this.seQueue, ...this.sgQueue);
    this.spQueue = [];
    this.seQueue = [];
    this.sgQueue = [];
  }

  // Obter sequência da senha
  private getSequence(type: 'SP' | 'SE' | 'SG'): string {
    const queue = type === 'SP' ? this.spQueue : type === 'SE' ? this.seQueue : this.sgQueue;
    return String(queue.length + 1).padStart(3, '0');
  }
}

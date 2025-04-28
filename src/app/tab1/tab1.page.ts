<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';

interface Senha {
  tipo: 'SP' | 'SG' | 'SE';
  senha: string;
  tempoEstimado: number;
}

interface Guiche {
  senha?: Senha;
  tempoRestante: number;
  timer?: any;
  ocupado: boolean;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false
})
export class Tab1Page implements OnInit {
  fila: Senha[] = [];
  senhaContador = { SP: 0, SG: 0, SE: 0 };
  proximoTipo: 'SP' | 'SE_SG' = 'SP';

  guiche1: Guiche = { tempoRestante: 0, ocupado: false };
  guiche2: Guiche = { tempoRestante: 0, ocupado: false };

  ngOnInit() {}

  gerarSenha(tipo: 'SP' | 'SG' | 'SE') {
    const senha: Senha = {
      tipo,
      senha: `${tipo}${++this.senhaContador[tipo]}`,
      tempoEstimado: this.definirTempoEstimado(tipo)
    };

    const guicheLivre = this.guiche1.ocupado ? (this.guiche2.ocupado ? null : this.guiche2) : this.guiche1;

    if (guicheLivre) {
      this.iniciarAtendimento(guicheLivre, senha);
    } else {
      this.fila.push(senha);
    }
  }

  definirTempoEstimado(tipo: 'SP' | 'SG' | 'SE'): number {
    if (tipo === 'SP') {
      const tempo = 15 + Math.floor(Math.random() * 11) - 5;
      return Math.min(tempo, 6);
    }
    if (tipo === 'SE') {
      return Math.random() < 0.95 ? 1 : 5;
    }
    if (tipo === 'SG') {
      return 5 + Math.floor(Math.random() * 7) - 3;
    }
    return 5;
  }

  distribuirSenhas() {
    [this.guiche1, this.guiche2].forEach(guiche => {
      if (!guiche.ocupado && this.fila.length) {
        const senha = this.pegarProximaSenha();
        if (senha) {
          this.iniciarAtendimento(guiche, senha);
        }
      }
    });
  }

  pegarProximaSenha(): Senha | undefined {
    if (this.proximoTipo === 'SP') {
      const index = this.fila.findIndex(s => s.tipo === 'SP');
      if (index >= 0) {
        this.proximoTipo = 'SE_SG';
        return this.fila.splice(index, 1)[0];
      }
    } else {
      const index = this.fila.findIndex(s => s.tipo === 'SE' || s.tipo === 'SG');
      if (index >= 0) {
        this.proximoTipo = 'SP';
        return this.fila.splice(index, 1)[0];
      }
    }
    return undefined;
  }

  iniciarAtendimento(guiche: Guiche, senha: Senha) {
    guiche.senha = senha;
    guiche.tempoRestante = senha.tempoEstimado * 60;
    guiche.ocupado = true;
  
    guiche.timer = setInterval(() => {
      guiche.tempoRestante--;
      if (guiche.tempoRestante <= 0) {
        clearInterval(guiche.timer);
        guiche.senha = undefined;
        guiche.ocupado = false;
  
        if (this.fila.length) {
          const proxima = this.fila.shift();
          if (proxima) {
            this.iniciarAtendimento(guiche, proxima);
          }
        }
      }
    }, 1000);
  }

  fecharGuiche(guiche: Guiche) {
    if (guiche.timer) {
      clearInterval(guiche.timer);
    }
    guiche.senha = undefined;
    guiche.ocupado = false;
    this.distribuirSenhas();
  }

  formatarTempo(segundos: number): string {
    const min = Math.floor(segundos / 60);
    const sec = segundos % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  }

=======
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
>>>>>>> 604bff2e340e524b177aeeae5acd0bcdf89ab0cd
}

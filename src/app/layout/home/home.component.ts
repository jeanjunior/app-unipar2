import { GraficoService } from './services/grafico.service';
import { Component, OnInit } from '@angular/core';
import { InfoChartViewModel, VendaMes } from './models/home.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public vendasPorMesValor: InfoChartViewModel =
    {
      loading: true,
      datasets: [],
      labels: []
    };

  public vendasPorMesQtde: InfoChartViewModel =
    {
      loading: true,
      datasets: [],
      labels: []
    };

  public vendasPorMesValorQtde: InfoChartViewModel =
    {
      loading: true,
      datasets: [],
      labels: []
    };


  constructor(
    private graficoService: GraficoService
  ) { }

  ngOnInit(): void {

    this.buscarDadosVendaAsync();

  }

  private buscarDadosVenda(): void {
    this.vendasPorMesValor = { loading: true, datasets: [], labels: [] };

    this.graficoService.vendasPorMes().subscribe(vendas => {

      this.montaDadosGraficoVendas(vendas);

    }, error => {
      //
    }, () => this.vendasPorMesValor.loading = false);


    // this.graficoService.vendasPorDia().subscribe(vendas => {

  }

  private montaDadosGraficoVendas(vendas: VendaMes[]): void {
    // Monta os dados e joga para as variaveis do grafico
    const labels = vendas.map(v => v.mes);
    const valores = vendas.map(v => v.valor);
    const qtdes = vendas.map(v => v.quantidade);

    // Valor
    this.vendasPorMesValor.datasets = [
      { data: valores, label: 'Valor' }
    ];
    this.vendasPorMesValor.labels = labels;

    // Qtde
    this.vendasPorMesQtde.datasets = [
      { data: qtdes, label: 'Qtde' }
    ];
    this.vendasPorMesQtde.labels = labels;

    // Valor e Qtde
    this.vendasPorMesValorQtde.datasets = [
      { data: valores, label: 'Valor', borderColor: '#0e5300', backgroundColor: '#0e53005e' },
      { data: qtdes, label: 'Qtde' }
    ];
    this.vendasPorMesValorQtde.labels = labels;

  }

  async buscarDadosVendaAsync(): Promise<void> {
    this.vendasPorMesValor = { loading: true, datasets: [], labels: [] };
    this.vendasPorMesQtde = { loading: true, datasets: [], labels: [] };
    this.vendasPorMesValorQtde = { loading: true, datasets: [], labels: [] };

    try {
      const vendas = await this.graficoService.vendasPorMes().toPromise();
      this.montaDadosGraficoVendas(vendas);

    } catch (error) {
      // alert
    } finally {
      this.vendasPorMesValor.loading = false;
      this.vendasPorMesQtde.loading = false;
      this.vendasPorMesValorQtde.loading = false;
    }

  }


}

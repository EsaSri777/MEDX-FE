import { Component, OnInit, OnDestroy } from '@angular/core';
import { MonitorService, VitalSigns } from '../../service/monitor.service';
import * as Plotly from 'plotly.js-dist-min';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-patient-monitor',
  template: `
    <div class="monitor-container">
      <div class="chart-grid">
        <div id="heartRateChart" class="chart"></div>
        <div id="bpChart" class="chart"></div>
        <div id="spo2Chart" class="chart"></div>
        <div id="temperatureChart" class="chart"></div>
        <div id="respiratoryChart" class="chart"></div>
        <div id="etco2Chart" class="chart"></div>
      </div>
    </div>
  `,
  styles: [`
    .monitor-container {
      padding: 20px;
      background: #f5f5f5;
    }
    .chart-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
    }
    .chart {
      height: 300px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
  `]
})
export class PatientMonitorComponent implements OnInit, OnDestroy {
  private patientId: string;
  private subscription: Subscription;
  private charts: { [key: string]: Plotly.PlotlyHTMLElement } = {};

  constructor(
    private monitorService: MonitorService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.patientId = this.route.snapshot.params['id'];
    this.initializeCharts();
    this.startMonitoring();
  }

  ngOnDestroy() {
    this.stopMonitoring();
    this.subscription?.unsubscribe();
  }

  private initializeCharts() {
    const commonLayout = {
      margin: { t: 30, r: 10, l: 40, b: 30 },
      showlegend: false,
      xaxis: { showgrid: false },
      yaxis: { showgrid: true }
    };

    // Heart Rate Chart
    this.createChart('heartRateChart', {
      ...commonLayout,
      title: 'Heart Rate (bpm)',
      yaxis: { range: [40, 140] }
    });

    // Blood Pressure Chart
    this.createChart('bpChart', {
      ...commonLayout,
      title: 'Blood Pressure (mmHg)',
      yaxis: { range: [40, 200] }
    });

    // SpO2 Chart
    this.createChart('spo2Chart', {
      ...commonLayout,
      title: 'SpO2 (%)',
      yaxis: { range: [90, 100] }
    });

    // Temperature Chart
    this.createChart('temperatureChart', {
      ...commonLayout,
      title: 'Temperature (°C)',
      yaxis: { range: [35, 40] }
    });

    // Respiratory Rate Chart
    this.createChart('respiratoryChart', {
      ...commonLayout,
      title: 'Respiratory Rate (bpm)',
      yaxis: { range: [8, 30] }
    });

    // EtCO2 Chart
    this.createChart('etco2Chart', {
      ...commonLayout,
      title: 'EtCO2 (mmHg)',
      yaxis: { range: [25, 55] }
    });
  }

  private createChart(elementId: string, layout: Partial<Plotly.Layout>) {
    const data: Plotly.Data[] = [{
      x: [],
      y: [],
      type: 'scatter',
      mode: 'lines',
      line: { color: '#2196F3', width: 2 }
    }];

    Plotly.newPlot(elementId, data, layout);
  }

  private startMonitoring() {
    this.monitorService.startMonitoring(this.patientId);
    this.subscription = this.monitorService.getVitalSigns().subscribe(data => {
      this.updateCharts(data);
    });
  }

  private stopMonitoring() {
    this.monitorService.stopMonitoring(this.patientId);
  }

  private updateCharts(data: VitalSigns[]) {
    const timestamps = data.map(d => d.timestamp);

    // Update Heart Rate
    Plotly.update('heartRateChart', {
      x: [timestamps],
      y: [data.map(d => d.heartRate)]
    });

    // Update Blood Pressure
    Plotly.update('bpChart', {
      x: [timestamps, timestamps],
      y: [
        data.map(d => d.bloodPressure.systolic),
        data.map(d => d.bloodPressure.diastolic)
      ]
    });

    // Update SpO2
    Plotly.update('spo2Chart', {
      x: [timestamps],
      y: [data.map(d => d.oxygenSaturation)]
    });

    // Update Temperature
    Plotly.update('temperatureChart', {
      x: [timestamps],
      y: [data.map(d => d.temperature)]
    });

    // Update Respiratory Rate
    Plotly.update('respiratoryChart', {
      x: [timestamps],
      y: [data.map(d => d.respiratoryRate)]
    });

    // Update EtCO2
    Plotly.update('etco2Chart', {
      x: [timestamps],
      y: [data.map(d => d.endTidalCO2)]
    });
  }
}
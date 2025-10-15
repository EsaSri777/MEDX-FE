import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

export interface VitalSigns {
  heartRate: number;
  bloodPressure: {
    systolic: number;
    diastolic: number;
  };
  oxygenSaturation: number;
  temperature: number;
  respiratoryRate: number;
  endTidalCO2: number;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class MonitorService {
  private socket: Socket;
  private vitalSignsSubject = new BehaviorSubject<VitalSigns[]>([]);
  private vitalSignsHistory: VitalSigns[] = [];
  private maxHistoryLength = 300; // Store 5 minutes of data (300 seconds)

  constructor() {
    this.socket = io(environment.apiUrl);
    
    this.socket.on('patient-vitals', (data: VitalSigns) => {
      this.vitalSignsHistory.push(data);
      
      // Keep only the last 5 minutes of data
      if (this.vitalSignsHistory.length > this.maxHistoryLength) {
        this.vitalSignsHistory.shift();
      }
      
      this.vitalSignsSubject.next(this.vitalSignsHistory);
    });
  }

  startMonitoring(patientId: string): void {
    this.vitalSignsHistory = []; // Clear previous data
    this.socket.emit('start-monitoring', { patientId });
  }

  stopMonitoring(patientId: string): void {
    this.socket.emit('stop-monitoring', { patientId });
  }

  getVitalSigns(): Observable<VitalSigns[]> {
    return this.vitalSignsSubject.asObservable();
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
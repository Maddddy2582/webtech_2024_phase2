import { Injectable } from '@angular/core';
import { DeliveryAgent } from '../models/delivery-agent.model';

@Injectable({
  providedIn: 'root'
})
export class DeliveryAgentService {
  private agentsKey = 'deliveryAgents';
  private currentAgentKey = 'currentDeliveryAgent';
  private agents: DeliveryAgent[] = [];

  constructor() {
    this.loadAgents();
    this.getAgents();
  }

  private loadAgents(): void {
    const savedAgents = localStorage.getItem(this.agentsKey);
    this.agents = savedAgents ? JSON.parse(savedAgents) : [];
  }

  saveAgents(): void {
    localStorage.setItem(this.agentsKey, JSON.stringify(this.agents));
  }

  registerAgent(agent: DeliveryAgent): boolean {
    console.log(agent);
    if (this.agents.some(a => a.email === agent.email)) {
      return false; 
    }
    this.agents.push(agent);
    this.saveAgents();
    return true; 
  }

  getAgents(): DeliveryAgent[] {
    const savedAgents = localStorage.getItem(this.agentsKey);
    const agents =  savedAgents ? JSON.parse(savedAgents) : [];
    console.log(agents.length);
    return savedAgents ? JSON.parse(savedAgents) : []
  }

  login(email: string, password: string): boolean {
    const agent = this.agents.find(a => a.email === email && a.password === password);
    if (agent) {
      localStorage.setItem(this.currentAgentKey, JSON.stringify(agent));
      return true;
    }
    return false;
  }

  getCurrentAgent(): DeliveryAgent | null {
    const agent = localStorage.getItem(this.currentAgentKey);
    console.log(agent);
    return agent ? JSON.parse(agent) : null;
  }

  updateAgent(updatedAgent: DeliveryAgent): void {
    const index = this.agents.findIndex(a => a.email === updatedAgent.email);
    if (index !== -1) {
      this.agents[index] = updatedAgent;
      this.saveAgents();
      localStorage.setItem(this.currentAgentKey, JSON.stringify(updatedAgent));
    }
  }

  logout(): void {
    localStorage.removeItem(this.currentAgentKey);
  }
}

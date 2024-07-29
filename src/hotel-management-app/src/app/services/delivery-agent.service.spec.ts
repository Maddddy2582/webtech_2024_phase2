import { TestBed } from '@angular/core/testing';
import { DeliveryAgentService } from './delivery-agent.service';
import { DeliveryAgent } from '../models/delivery-agent.model';

describe('DeliveryAgentService', () => {
  let service: DeliveryAgentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeliveryAgentService]
    });
    service = TestBed.inject(DeliveryAgentService);
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('registerAgent', () => {
    it('should register a new agent', () => {
      const agent: DeliveryAgent = {
        email: 'test@example.com',
        password: 'password',
        name: 'Test Agent',
        phone: '1234567890'
      };
      const result = service.registerAgent(agent);
      expect(result).toBe(true);
      const agentList = service.getAgents()
      expect (agentList.length).toBe(1)
    });

    it('should not register agent with duplicate email', () => {
      const agent: DeliveryAgent = {
        email: 'test@example.com',
        password: 'password',
        name: 'Test Agent',
        phone: '1234567890'
      };
      service.registerAgent(agent);
      const result = service.registerAgent(agent); 
      expect(result).toBe(false);
      expect(service.getAgents().length).toBe(1)
    });
  });

  describe('login', () => {
    it('should login an existing agent', () => {
      const agent: DeliveryAgent = {
        email: 'test@example.com',
        password: 'password',
        name: 'Test Agent',
        phone: '1234567890'
      };
      service.registerAgent(agent);
      const loggedIn = service.login('test@example.com', 'password');
      expect(loggedIn).toBe(true);
      const currentAgent = service.getCurrentAgent();
      expect(currentAgent).toEqual(agent);
    });

    it('should not login with incorrect credentials', () => {
      const loggedIn = service.login('nonexistent@example.com', 'wrongpassword');
      expect(loggedIn).toBe(false);
      const currentAgent = service.getCurrentAgent();
      expect(currentAgent).toBeNull();
    });
  });

  describe('updateAgent', () => {
    it('should update an existing agent', () => {
      const agent: DeliveryAgent = {
        email: 'test@example.com',
        password: 'password',
        name: 'Test Agent',
        phone: '1234567890'
      };
      service.registerAgent(agent);
      const updatedAgent: DeliveryAgent = {
        email: 'test@example.com',
        password: 'newpassword',
        name: 'Updated Test Agent',
        phone: '1234567890'
      };
      service.updateAgent(updatedAgent);
      const agents = service.getAgents();
      const updatedAgentFromService = agents.find(a => a.email === 'test@example.com');
      expect(updatedAgentFromService).toEqual(updatedAgent);
    });

    it('should not update if agent does not exist', () => {
      const updatedAgent: DeliveryAgent = {
        email: 'nonexistent@example.com',
        password: 'newpassword',
        name: 'Updated Test Agent',
        phone: '1234567890'
      };
      service.updateAgent(updatedAgent);
      const agents = service.getAgents();
      const updatedAgentFromService = agents.find(a => a.email === 'nonexistent@example.com');
      expect(updatedAgentFromService).toBeUndefined();
    });
  });

  describe('logout', () => {
    it('should clear current agent on logout', () => {
      const agent: DeliveryAgent = {
        email: 'test@example.com',
        password: 'password',
        name: 'Test Agent',
        phone: '1234567890'        
      };
      service.registerAgent(agent);
      service.login('test@example.com', 'password');
      service.logout();
      const currentAgent = service.getCurrentAgent();
      expect(currentAgent).toBeNull();
    });
  });
});

import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeliveryAgentService } from '../../services/delivery-agent.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './delivery-agent-navbar.component.html',
  styleUrls: ['./delivery-agent-navbar.component.css']
})
export class DeliveryAgentNavBarComponent implements OnInit {

  constructor(
    private router: Router , 
    private deliveryAgentService: DeliveryAgentService
  ){}

  ngOnInit():void{
  }

  openProfile(){
    this.router.navigate(['/delivery-agent/profile'])
  }

  logout(){
    this.deliveryAgentService.logout();
  }

}

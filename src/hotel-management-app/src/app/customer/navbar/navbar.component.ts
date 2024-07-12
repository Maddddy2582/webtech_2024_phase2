import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavBarComponent {

  constructor(private router: Router , private customerService : CustomerService){}
  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  searchTerm: string = '';

  onSearch(): void {
    this.search.emit(this.searchTerm);
  }

  navToHome(){
    this.router.navigate(['/dashboard'])
  }

  openCart(){
    this.router.navigate(['/cart'])
  }

  openProfile(){
    this.router.navigate(['/profile'])
  }

  logout(){
    this.customerService.logout();
  }
}

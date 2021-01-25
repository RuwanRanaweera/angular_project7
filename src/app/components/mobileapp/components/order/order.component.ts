import { Component, OnInit } from '@angular/core';

import { UserService } from '../../../../shared/user.service';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  order:any[]; 
  constructor(private userService: UserService) { }

  ngOnInit() {

    this.fetchOrders()
  }



    fetchOrders(){
    this.userService.getOrders().subscribe((data:any[])=>{
      this.order=data;
      console.log('Data requested...');
      console.log(this.order);
    });
  }


}

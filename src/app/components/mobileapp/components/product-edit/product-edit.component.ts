import { Component, OnInit } from '@angular/core';
import {Router ,ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { UserService } from '../../../../shared/user.service';
@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  id:String;
  product:any={};
  showSucessMessage: boolean;

  constructor(private userService: UserService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params=>{
      this.id=params.id;
      this.userService.getProductById(this.id).subscribe(res=>{
      this.product=res;
      this.userService.newProduct.productName=this.product.productName;
      this.userService.newProduct.dateTime=this.product.dateTime;
      this.userService.newProduct.oriName=this.product.oriName;
      this.userService.newProduct.price=this.product.price;
      this.userService.newProduct.description=this.product.description;
      })
          });
  }


  updateProduct(productName,dateTime,oriName,price,description,form){
    this.userService.updateProduct(this.id,productName,dateTime,oriName,price,description).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
                  this.resetForm(form);
                  this.userService.updateSuccess=true;
                  this.router.navigate([`/products`]);
                       
      },
      err => {  
        console.log(err);
        // if (err.status === 422) {
        //   this.serverErrorMessages = err.error.join('<br/>');
        // }
        // else
        //   this.serverErrorMessages = 'Something went wrong.';
      }
     
 );
}

  resetForm(form: NgForm) {
    this.userService.newProduct = {
      productName:'',
      dateTime:'',
      oriName:'',
      price:'', 
      description:''
    };
    form.resetForm();
    
  }
   


}

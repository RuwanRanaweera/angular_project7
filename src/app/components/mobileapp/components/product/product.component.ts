import { Component, OnInit } from '@angular/core';
import {MatDialog,MatSnackBar} from '@angular/material';
import { FileUPComponent } from '../../../file-up/file-up.component';
import { ConfirmationDialogService } from '../../../../confirmation-dialog/confirmation-dialog.service';
import {Router } from '@angular/router';


import { UserService } from '../../../../shared/user.service';
import { product} from '../../../../shared/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
product:product[];
searchText;
  constructor(private userService: UserService,public dialog: MatDialog,private router:Router,private confirmationDialogService: ConfirmationDialogService,private snackBar:MatSnackBar) { }

  ngOnInit() {
   this.updateSuccessMsg();
   this.fetchProduct();
  }
  public openConfirmationDialog(id) {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to ... ?')
    .then((confirmed) => {
      if(confirmed) {

        this.userService.deleteProduct(id).subscribe(()=>{
          this.fetchProduct();
        });
      };
      console.log('User confirmed:', confirmed)} )
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }
    

  fetchProduct(){
    this.userService.getProducts().subscribe((data:product[])=>{
      this.product=data;
      console.log('Data requested...');
      console.log(this.product);
    });
  }


  // deleteProduct(id){
  //   if(confirm("Are you sure to delete ")) {

  //   this.userService.deleteProduct(id).subscribe(()=>{
  //     this.fetchProduct();
  //   });
  // }
  // }

  openDialog(): void {
    let dialogRef = this.dialog.open(FileUPComponent);
    dialogRef.afterClosed().subscribe(()=>{
     this.fetchProduct();
    })
  }

  editProduct(id){
    this.router.navigate([`/products/edit/${id}`]);
 }



 updateSuccessMsg(){
  if(this.userService.updateSuccess){
    this.userService.updateSuccess=false;  
this.snackBar.open('Edit Successfully','Ok',{duration:3000 , verticalPosition: 'top'});
}
}
}

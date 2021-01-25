import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { UserService } from '../../shared/user.service';
import { NgForm } from '@angular/forms';
import {MatDialogRef,MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-file-up',
  templateUrl: './file-up.component.html',
  styleUrls: ['./file-up.component.css']
})
export class FileUPComponent implements OnInit {
file;


  constructor(private FilesService : UserService,public dialogRef: MatDialogRef<FileUPComponent> ,private snackBar:MatSnackBar) { }
  private files = [];
  private url = 'http://192.168.8.100:3000/api/upload';
  private uploader: FileUploader;
  showSucessMessage: boolean;
  ngOnInit() {
    this.resetForm2();
   
    var today = new Date();
var date = today.getFullYear()+""+(today.getMonth()+1)+""+today.getDate();
var time = today.getHours() + "" + today.getMinutes() + "" + today.getSeconds();
var dateTime = date+""+time;


    this.uploader = new FileUploader({url: this.url+"/"+name+dateTime,  queueLimit: 1 });
    this.FilesService.newProduct.dateTime=dateTime;
       

      
  }

   
  onNoClick(): void {
    this.dialogRef.close();
  }

  
  onSubmit(form: NgForm) {

    this.uploader.onBeforeUploadItem = (item:any) => {
      item.withCredentials = false;
      this.uploader.options.additionalParameter = {
        name: this.FilesService.newProduct.productName
       
      };
    };
     
    
    this.FilesService.addProduct(form.value).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
    this.resetForm(form);
    this.dialogRef.close();
      },
      // err => {
      //   if (err.status === 422) {
      //     this.serverErrorMessages = err.error.join('<br/>');
      //   }
      //   else
      //this.serverErrorMessages = 'Something went wrong.';
      // }
    );
    this.snackBar.open('Added Successfully','Ok',{duration:3000 , verticalPosition: 'top'});
  
}

resetForm(form: NgForm) {
  this.FilesService.newProduct = {
    productName:'',
    dateTime:'',
    oriName:'',
    price:'', 
    description:''
  };
  form.resetForm();
 
}
resetForm2() {
  this.FilesService.newProduct = {
    productName:'',
    dateTime:'',
    oriName:'',
    price:'', 
    description:''
  };
 
}







}


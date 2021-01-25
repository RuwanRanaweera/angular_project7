import { Component, OnInit ,EventEmitter ,ElementRef } from '@angular/core';

import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { HttpClient,HttpHeaders } from "@angular/common/http"
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";

import { environment } from '../../../../../environments/environment'


@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {
  selectedFile: File= null;
  selectedFiles: File[];
  name:string='';
  
  constructor(private http:HttpClient) { }

  ngOnInit() {

  }

  public uploader: FileUploader = new FileUploader({
   
    disableMultipart : false,
    itemAlias: 'attachment',
    allowedFileType: ['image']


    });

  // public onFileSelected(event: EventEmitter<File[]>) {
  //   const file: File = event[0];
  //   console.log(file);

  // }

  ons(){
   

    console.log( this.uploader.queue.length)
    console.log( this.uploader.queue)
    console.log( this.uploader.queue[0])
  }
    



  onSubmit(){
    const fd =new FormData();
this.selectedFiles = new Array<File>(this.uploader.queue.length);
    for (let i = 0; i < this.uploader.queue.length; i++) {
 
      this.selectedFiles[i] = this.uploader.queue[i]._file;
      
    }


    // for (let j = 0; j < this.uploader.queue.length; j++) {
    //   let fd = new FormData();
    //   let fileItem = this.uploader.queue[j]._file;
    //   console.log(fileItem.name);
    //   fd.append('file', fileItem);
    //   fd.append('fileSeq', 'seq'+j);
    // }

    console.log( this.uploader.queue.length)
    console.log( this.selectedFiles)
    // console.log( this.selectedFile[0] );
    // console.log(  this.uploader.queue[0]._file );

// this.selectedFile =  this.uploader.queue[0];

for (let i = 0; i < this.uploader.queue.length; i++) {
  fd.append('file',   this.selectedFiles[i] , this.selectedFiles[i].name);
  fd.append('name',   this.name);

  this.http.post(environment.apiBaseUrl + '/filearr',fd )
.subscribe(res => {console.log("okay...")})


} 




  }


}

import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-customize',
  templateUrl: './customize.component.html',
  styleUrls: ['./customize.component.css']
})
export class CustomizeComponent implements OnInit {

  selectedFile: File = null;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }

  // TODO set db resource collegata a userId
  onUpload() {
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.http.post('url/to/define', fd, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(res => {
        // if (event.type === HttpEventType.UploadProgress) {
        //   console.log('Upload Progress: ' + Math.round(event.loaded / event.total * 100) + '%');
        // } else if (event.type === HttpEventType.Response) {
        //   console.log(res);
        // }
      });
  }
}

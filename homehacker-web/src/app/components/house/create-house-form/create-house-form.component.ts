import { Component, OnInit, ViewChild, Output, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
import { House } from '../../../models/house.model';
import { FormGroup } from '@angular/forms';
import { HomeService } from '../../../shared/services/home.service';

@Component({
  selector: 'app-create-house-form',
  templateUrl: './create-house-form.component.html',
  styleUrls: ['./create-house-form.component.css']
})
export class CreateHouseFormComponent implements OnInit {
  @ViewChild('formHouseCreate') houseCreateForm: FormGroup;
  @Output() houseSubmit: EventEmitter<House> = new EventEmitter();
  @Input() house: House = new House();
  
  previewImages: Array<String | ArrayBuffer> = [];
  
  constructor(private homeService: HomeService, private changesDetector: ChangeDetectorRef) { }
  
  ngOnInit() {
    
  }
  
  onSubmitCreateHouse(){        
    // if (this.houseCreateForm.valid) {
      this.houseSubmit.emit(this.house);
    // }
  }
  
  onChangeImageFile(images: HTMLInputElement){
    if (images.files) {
      this.previewImages = [];
      for (let i = 0; i < images.files.length; i++) {        
        this.house.photos.push(images.files[i]);
        this.renderPreviewImg(images.files[i]);
      }      
    }
  }

  renderPreviewImg(photoFile: File){
    const reader = new FileReader();
    reader.readAsDataURL(photoFile);
    reader.onload = () =>{
      this.previewImages.push(reader.result);
      this.changesDetector.markForCheck(); // ???? PARA QUE, SIN ESTO TAMBIEN SIRVE
    }
  }
}

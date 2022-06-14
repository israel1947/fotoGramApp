import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-avatar-select',
  templateUrl: './avatar-select.component.html',
  styleUrls: ['./avatar-select.component.scss'],
})
export class AvatarSelectComponent implements OnInit {


  @Output()avatarSelect = new EventEmitter<string>();

  avatars = [
    {
      img: 'av-1.png',
      seleccionado: true
    },
    {
      img: 'av-2.png',
      seleccionado: false
    },
    {
      img: 'av-3.png',
      seleccionado: false
    },
    {
      img: 'av-4.png',
      seleccionado: false
    },
    {
      img: 'av-5.png',
      seleccionado: false
    },
    {
      img: 'av-6.png',
      seleccionado: false
    },
    {
      img: 'av-7.png',
      seleccionado: false
    },
    {
      img: 'av-8.png',
      seleccionado: false
    },
];

slidesOptions = {
  slidesPerView: 3.5,
  
};

  constructor() { }

  ngOnInit() {}

  onSelectAvatar(avatar){
    this.avatars.forEach(ava=>ava.seleccionado=false);
    avatar.seleccionado = true;
    this.avatarSelect.emit(avatar.img);
    console.log(avatar.img);
    
  }

}

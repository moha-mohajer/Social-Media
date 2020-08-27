import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // recive proprty to child components
  @Input() valuesFromHome: any;
  @Output() cancleRegister = new EventEmitter();
  model: any = {};
  constructor() { }

  ngOnInit() {
  }

  register(){
    console.log(this.model);
  }

  cancle(){
    this.cancleRegister.emit(false);
    console.log('cancle');
  }
}

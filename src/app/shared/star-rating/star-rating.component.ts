import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html'
})
export class StarRatingComponent implements OnInit {

  @Input() rate;
  @Output() change = new EventEmitter();

  constructor() { }

  ngOnInit() {
    console.log(this.rate);
  }

  onChange(value){
    this.rate = value;
    this.change.emit(this.rate);
  }

  getRate(){
    return parseInt(this.rate);
  }

}

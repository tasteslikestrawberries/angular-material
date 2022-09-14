import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit {
  @Input() name!: string;
  @Output() clicked = new EventEmitter();
  message = 'My message'
  constructor() { 
  }

  ngOnInit(): void {
    console.log(this.name);
  }

  handleclick() {
    this.clicked.emit(this.message)
}

}

import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClickAreaService {

  clickArea: EventEmitter<string> = new EventEmitter();
  constructor() {}
  emitNavChangeEvent(area) {
    this.clickArea.emit(area);
  }
  getNavChangeEmitter() {
    return this.clickArea;
  }
}

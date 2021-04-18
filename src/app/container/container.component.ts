import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit {
  id = 0;
  boxIds = [];
  keys = {
    top: ['arrowup', 'w'],
    bottom: ['arrowdown', 's'],
    left: ['arrowleft', 'a'],
    right: ['arrowright', 'd'],
    delete: ['delete'],
  };
  opposite = {
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left',
  };
  selectedBox;
  selectedBoxId = null;
  movepixel = 10;
  isListen = true;

  constructor() {}

  ngOnInit(): void {}

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (!this.selectedBoxId) return;
    if (!this.isListen) return;
    if (this.keys.top.includes(event.key.toLowerCase())) this.action('top');
    if (this.keys.bottom.includes(event.key.toLowerCase()))
      this.action('bottom');
    if (this.keys.left.includes(event.key.toLowerCase())) this.action('left');
    if (this.keys.right.includes(event.key.toLowerCase())) this.action('right');
    if (this.keys.delete.includes(event.key.toLowerCase()))
      this.selectedBox ? this.selectedBox.remove() : null;
  }

  onBoxClick(event) {
    this.selectedBox = event.target || event.srcElement || event.currentTarget;
    this.selectedBoxId = this.selectedBox.attributes.id.nodeValue;
  }

  createBox() {
    this.boxIds.push(this.id);
    this.id++;
  }

  action(key) {
    if (!this.selectedBoxId) return;
    const selectedStyle = this.selectedBox?.style;
    selectedStyle[this.opposite[key]] = `${
      Number(selectedStyle[this.opposite[key]].split('px')[0]) + this.movepixel
    }px`;
    selectedStyle[key] = `${
      Number(selectedStyle[key].split('px')[0]) - this.movepixel
    }px`;
    // let revert = false;
    // if (
    //   Number(selectedStyle.top.split('px')[0]) < 0 ||
    //   Number(selectedStyle.top.split('px')[0]) > 480
    // )
    //   revert = true;
    // if (
    //   Number(selectedStyle.left.split('px')[0]) < 0 ||
    //   Number(selectedStyle.left.split('px')[0]) > 1366
    // )
    //   revert = true;
    // if (revert) {
    //   selectedStyle[this.opposite[key]] = `${
    //     Number(selectedStyle[this.opposite[key]].split('px')[0]) -
    //     this.movepixel
    //   }px`;
    //   selectedStyle[key] = `${
    //     Number(selectedStyle[key].split('px')[0]) + this.movepixel
    //   }px`;
    // }
  }
}

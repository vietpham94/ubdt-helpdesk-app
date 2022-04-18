import {Component, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private element: ElementRef) {
  }

  ngOnInit() {
  }

  scrollContent(event) {
    const cardList = this.element.nativeElement.querySelectorAll('.card-item');
    for (let i = (cardList.length - 1); i--; i < 0) {
      if (cardList[i].offsetTop <= event.detail.scrollTop) {
        console.log('scroll' + event.detail.scrollTop);
        console.log('element' + cardList[i].offsetTop);
        cardList[i].style.backgroundColor = 'red';
        break;
      } else {
        cardList[i].style.backgroundColor = 'white';
      }
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { ConsultSumm } from 'src/app/models/consultsumm.model';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.page.html',
  styleUrls: ['./summary.page.scss'],
})
export class SummaryPage implements OnInit {

  ordSummary: ConsultSumm = JSON.parse(localStorage.getItem('orderSummary'))


  constructor() { }

  ngOnInit() {
  }

}
 
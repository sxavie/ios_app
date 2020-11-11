import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-famdata',
  templateUrl: './famdata.page.html',
  styleUrls: ['./famdata.page.scss'],
})
export class FamdataPage implements OnInit {

  public memberData;
  public hrefBack;


  constructor() { }

  ngOnInit() {

    this.memberData = localStorage.getItem('member-view')
    this.hrefBack = `app/familaires/familiar/${this.memberData._id}`
  }

}

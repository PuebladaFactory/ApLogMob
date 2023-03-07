import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ops',
  templateUrl: './ops.page.html',
  styleUrls: ['./ops.page.scss'],
})
export class OpsPage implements OnInit {


  public arr = new Array(25);
  constructor() { }

  ngOnInit() {
  }

}
